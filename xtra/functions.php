<?php
function do_at_login() {
    debug_to_console( "PHPjsTest @ logintest" );
    if (is_user_logged_in()) {
        //debug_to_console( ["PHPjsTest @ logintest", $user_info_user_login, json_encode($user_info_user_login)] );
        //debug_to_console( ["PHPjsTest @ logintest", $user_login, json_encode($user)] );
        debug_to_console( "PHPjsTest @ logintest" );
    }
}
add_action('wp-login', 'do_at_login', 10);
function debug_to_console($data) {
    if(is_array($data) || is_object($data))
	{
		echo("<script>console.log('PHP: ".json_encode($data)."');</script>");
	} else {
		echo("<script>console.log('PHP: ".$data."');</script>");
	}
}
//do_action( 'wp_login', string $user_login, WP_User $user )
//$pubnub_subs_key = 'sub-c-4d557e6a-c0a3-11e6-b38f-02ee2ddab7fe';
//echo json_encode($pubnub_subs_key);
//$pubnub_pub_key = 'pub-c-9e04b0e5-e150-4c73-8d9e-d2766d5ab796';
//echo json_encode($pubnub_pub_key);
function player_info() {
    if (is_user_logged_in()) {
        $phpJsVars = [
            'puuid' => wp_get_current_user()->puuid,
            'display_name' => wp_get_current_user()->display_name,
            'subKey' => "sub-c-4d557e6a-c0a3-11e6-b38f-02ee2ddab7fe",
            'pubKey' => "pub-c-9e04b0e5-e150-4c73-8d9e-d2766d5ab796"
        ];
        $output = "<script> var playerInfo = ".json_encode($phpJsVars).";</script>";
        echo $phpToJsVars;
        echo $output;
    } else {
        $output="<script> var playerInfo; </script>";
        echo $output;
    }
}
/*function player_info() {
    if (is_user_logged_in()) {
        $outputs="<script> var playerInfo = [".json_encode(wp_get_current_user()->puuid).", ".json_encode(wp_get_current_user()->display_name)."]; </script>";
        //$outputs="<script> var playerInfo = ".json_encode(wp_get_current_user())."; </script>";
        //$outputs="<script> var playerInfo = ".json_encode(wp_get_current_user()->puuid)."; </script>";
        $phpToJsVars = [
            'value1' => 'foo1',
            'value2' => 'foo2'
        ];
        $output = "<script> var phpVars = { " .json_encode($phpToJsVars)."};</script>";
        echo $outputs;
        echo $phpToJsVars;
        echo $output;
    } else {
        $outputs="<script> var playerInfo; </script>";
        $phpToJsVars = [
            'value1' => 'foo1',
            'value2' => 'foo2'
        ];
        $output="<script> var phpVars; </script>";
        echo $outputs;
        echo $phpToJsVars;
        echo $output;
    }
}*/
add_action('wp_head','player_info');
remove_action('wp_head', 'print_emoji_detection_script', 7);
remove_action('wp_head', 'rsd_link');
remove_action('wp_head', 'wlwmanifest_link');
remove_action('wp_head', 'wp_generator');
remove_action('wp_print_styles', 'print_emoji_styles');
remove_action( 'admin_print_scripts', 'print_emoji_detection_script' );
remove_action( 'admin_print_styles', 'print_emoji_styles' );
remove_filter('the_content', 'wpautop');
add_filter('manage_users_columns', 'add_user_id_column');
function add_user_id_column($columns) {
    $columns['user_id'] = 'User ID';
    return $columns;
}
add_action('manage_users_custom_column',  'show_user_id_column_content', 10, 3);
function show_user_id_column_content($value, $column_name, $user_id) {
    $user = get_userdata( $user_id );
	if ( 'user_id' == $column_name )
		return $user_id;
    return $value;
}
add_filter('manage_edit-page_columns', 'custom_set_pages_columns');
add_action('manage_pages_custom_column', 'custom_set_pages_columns_page_id', 10, 2);
add_action('admin_head', 'custom_admin_styling');
function custom_set_pages_columns($columns) {
	return array(
		'cb'      => '<input type="checkbox" />',
		'page_id' => __('ID'),
		'title'   => __('Title'),
		'author'  => __('Author'),
		'date'    => __('Date')
	);
}
function custom_set_pages_columns_page_id($column, $post_id) {
	if ($column == 'page_id') {
		echo $post_id;
	}
}
function custom_admin_styling() {
	echo '<style type="text/css">',
	'th#page_id { width:60px; }',
	'</style>';
}
if (!current_user_can('manage_options') ) {
	show_admin_bar(false);
}
if (current_user_can('manage_options') ) {
	show_admin_bar(false);
}
add_action('get_header', 'remove_admin_login_header');
function remove_admin_login_header() {
	remove_action('wp_head', '_admin_bar_bump_cb');
}
add_action( 'admin_head-user-edit.php', 'remove_website_css' );
add_action( 'admin_head-profile.php', 'remove_website_css' );
function remove_website_css(){
    echo '<style>tr.user-url-wrap{ display: none; }</style>';
}
function my_login_redirect( $redirect_to, $request, $user ) {
	global $user;
	if ( isset( $user->roles ) && is_array( $user->roles ) ) {
		if ( in_array( 'administrator', $user->roles ) ) {
			return home_url('//wp-admin/index.php');
		} else {
			//return home_url();
			return home_url('//demo/');
	}
	} else {
		return home_url('//demo/');
	}
}
add_filter( 'login_redirect', 'my_login_redirect', 10, 3 );
add_filter('widget_text','execute_php_widgets',10);
function execute_php_widgets($html){
   if(strpos($html,"<"."?php")!==false){
   ob_start();
   eval("?".">".$html);
   $html=ob_get_contents();
   ob_end_clean();
   }
return $html;
}
add_action( 'admin_bar_menu', 'remove_wp_logo', 999 );

function remove_wp_logo( $wp_admin_bar ) {
$wp_admin_bar->remove_node( 'wp-logo' );
}
/*function hook_javascript() {

    if(is_user_logged_in()) {
        $output="<script> var userObject = ".json_encode(wp_get_current_user())."; console.log(JSON.stringify(userObject)); </script>";
        echo $output;
    } else {
        $output="<script> var userObject; </script>";
        echo $output;
    }
}
add_action('wp_head','hook_javascript');*/

/*if ( $_POST ) {
    // Get the values after form submission
    $username = sanitize_user( $_POST['username'], true );

    // Get the current user
    $current_user = wp_get_current_user();

    // Initailizing variables
    $error = false;
    $message = '';
    $uname = 0;

    // Checking the validatiy of the username and change it
    if ( $username ) {
        if ( $username !== $current_user->user_login ) {
           if ( username_exists( $username ) ) {
               $error = true;
               $message = 'Username already exists';
           } else {
               global $wpdb;

               // Query to change the username
               $query = $wpdb->query( $wpdb->prepare( "UPDATE $wpdb->users SET user_login = %s WHERE user_login = %s", $username, $current_user->user_login ) );

               if ( $query ) {
                   $message = 'Profile updated';
                   $uname = 1;
               }
           }
       }
    } else {
        $error = true;
        $message = 'Username is a required field.';
    }
}
// Logging in the user if the username has been changed.
if ( $uname ) {
    wp_set_auth_cookie( $current_user->ID );
}*/
