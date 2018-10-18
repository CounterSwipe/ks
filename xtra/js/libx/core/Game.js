define(function() {
    var simulationTimestep = 1000 / 10, //1000/10 = 10tps was 1000/60 | 1000/10
        frameDelta = 0,
        lastFrameTimeMs = 0,
        fps = 30, //was 60 | 10
        fpsAlpha = 0.9,
        fpsUpdateInterval = 100, //200 = 5/s was 1000
        lastFpsUpdate = 0,
        framesSinceLastFpsUpdate = 0,
        numUpdateSteps = 0,
        minFrameDelay = 0, //100 was 0
        running = false,
        started = false,
        panic = false,
        windowOrRoot = typeof window === 'object' ? window : root,
        requestAnimationFrame = windowOrRoot.requestAnimationFrame || (function() {
            var lastTimestamp = Date.now(),
                now,
                timeout;
            return function(callback) {
                now = Date.now();
                timeout = Math.max(0, simulationTimestep - (now - lastTimestamp));
                lastTimestamp = now + timeout;
                return setTimeout(function() {
                    callback(now + timeout);
                }, timeout);
            };
        })(),
        cancelAnimationFrame = windowOrRoot.cancelAnimationFrame || clearTimeout,
        NOOP = function() {},
        begin = NOOP,
        end = NOOP,
        rafHandle,
        aTick = 0,
        zTick = 0;
    class Game {
        constructor() {
            //this.agi = [];
            this.modules = [];
            this.outputs = [];
            this.systems = [];
            //this.ticks = 0;
        }
        addEids(eids, boot) {
            var self = this;
            for (var i = 0, elen = eids.length; i < elen; i++) {
                var eid = new eids[i]();
                if (typeof eid.init === "function") {
                    eid.init(self, boot);
                }
            }
        }
        addModules(modules) {
            var self = this;
            for (var i = 0, mlen = modules.length; i < mlen; i++) {
                var module = new modules[i]();
                self.modules.push(module);
                if (typeof module.init === "function") {
                    module.init(self);
                }
            }
        }
        addOutputs(outputs) {
            var self = this;
            for (var i = 0, olen = outputs.length; i < olen; i++) {
                var output = new outputs[i]();
                self.outputs.push(output);
                if (typeof output.activate === "function") {
                    output.activate(self);
                }
            }
        }
        addSystems(systems) {
            var self = this;
            for (var i = 0, slen = systems.length; i < slen; i++) {
                var system = new systems[i]();
                self.systems.push(system);
                if (typeof system.activate === "function") {
                    system.activate(self);
                }
            }
        }
        checkAllSystemsReady() {
            var self = this;
            return self.systems.every(function(system) {
                return system.isReady;
            });
        }
        getFPS() {
            return fps;
        }
        getMaxAllowedFPS() {
            return 1000 / minFrameDelay;
        }
        getSimulationTimestep() {
            return simulationTimestep;
        }
        isRunning() {
            return running;
        }
        pause() {
            cancelAnimationFrame(rafHandle); /*global cancelAnimationFrame*/
            console.log("gamePaused", this);
        }
        play(timestamp) {
            /*global game*/
            var animate = function(timestamp) {
                if (game.checkAllSystemsReady()) {
                    rafHandle = requestAnimationFrame(animate);
                    if (timestamp < lastFrameTimeMs + minFrameDelay) {
                        return;
                    }
                    frameDelta += timestamp - lastFrameTimeMs;
                    lastFrameTimeMs = timestamp;
                    begin(timestamp, frameDelta);
                    if (timestamp > lastFpsUpdate + fpsUpdateInterval) {
                        fps = fpsAlpha * framesSinceLastFpsUpdate * 1000 / (timestamp - lastFpsUpdate) + (1 - fpsAlpha) * fps;
                        lastFpsUpdate = timestamp;
                        framesSinceLastFpsUpdate = 0;
                    }
                    framesSinceLastFpsUpdate++;
                    numUpdateSteps = 0;
                    while (frameDelta >= simulationTimestep) {
                        game.update(simulationTimestep);
                        frameDelta -= simulationTimestep;
                        if (++numUpdateSteps >= 240) {
                            panic = true;
                            break;
                        }
                    }
                    game.render(frameDelta / simulationTimestep);
                    end(fps, panic);
                    panic = false;
                }
            };
            animate(timestamp);
        }
        pushSpd(aT) {
            var tikz = 200;
            var self = this;
            var zT = Date.now();
            var spd = Math.round((zT - aT), 5);
            if (self.agi.length === 0) { aTick = Date.now(); }
            if (self.agi.length === tikz) { zTick = Date.now(); }
            if (self.agi.length < tikz) { self.agi.push(spd); }
            else { self.stop(self.spdLog(self, tikz, Math.round((zTick - aTick), 5))); }
        }
        render(fdsts) {
            //console.log(fdsts); //fdsts = 0.001 ^ 0.999
            for (var i = 0, draw = game.outputs.length; i < draw; i++) {
                if (typeof game.outputs[i].render === "function") {
                    game.outputs[i].render(fdsts);
                }
            }
        }
        resetFrameDelta() {
            var oldFrameDelta = frameDelta;
            frameDelta = 0;
            return oldFrameDelta;
        }
        setBegin(fun) {
            begin = fun || begin;
            return this;
        }
        setEnd(fun) {
            end = fun || end;
            return this;
        }
        setMaxAllowedFPS(fps) {
            if (typeof fps === 'undefined') {
                fps = Infinity;
            }
            if (fps === 0) {
                this.stop();
            }
            else {
                // Dividing by Infinity returns zero.
                minFrameDelay = 1000 / fps;
            }
            return this;
        }
        setSimulationTimestep(timestep) {
            simulationTimestep = timestep;
            return this;
        }
        spdLog(self, tikz, tTotal) {
            var avgSpd = Math.round((self.agi.reduce((prev, curr) => prev + curr) / tikz), 7);
            //console.log("fps", fps);
            console.log("@spdLog:", tTotal, "ms", tikz, "ticks", "avgSpd:", avgSpd);
        }
        start() {
            if (!started) {
                started = true;
                rafHandle = requestAnimationFrame(function(timestamp) {
                    game.render(1);
                    running = true;
                    lastFrameTimeMs = timestamp;
                    lastFpsUpdate = timestamp;
                    framesSinceLastFpsUpdate = 0;
                    rafHandle = requestAnimationFrame(game.play);
                });
            }
            return this;
        }
        stop() {
            running = false;
            started = false;
            cancelAnimationFrame(rafHandle);
            //console.log("gameStop", this);
            return this;
        }
        update(sts) {
            //var self = this;
            //console.log(sts); //sts = 100
            //var aT = Date.now();
            for (var i = 0, build = game.systems.length; i < build; i++) {
                if (typeof game.systems[i].update === "function") {
                    game.systems[i].update(sts);
                }
            }
            //self.ticks++;
            //game.pushSpd(aT);
        }
    }
    return Game;
});
