#![cfg_attr(
    all(not(debug_assertions), target_os = "windows"),
    windows_subsystem = "windows"
)]

use base64::{engine::general_purpose, Engine as _};
use reqwest::StatusCode;
use std::sync::mpsc;
use std::thread;
use tauri::{Manager, Window};

#[derive(Clone, serde::Serialize)]
struct StatusPayload {
    status_payload: String,
}

#[derive(Clone, serde::Serialize)]
struct IconPayload {
    icon_payload: String,
}

/**
 * pass_website_data is a asynchronous function that attempts to get the status code of a website
 * @param {&str} url - the website to get the status from
 * @returns {String} - returns the status code as a string, or "No OK response" if the request fails
 */
#[tokio::main]
async fn pass_website_data(url: &str) -> String {
    match reqwest::get(url).await {
        Ok(response) => return response.status().to_string(),
        Err(error) => return error.status().unwrap_or(StatusCode::NOT_FOUND).to_string(),
    }
}

/**
 * pass_website_icon is a asynchronous function that attempts to get the favicon of a website
 * @param {&str} url - the website to get the favicon from
 * @returns {String} - returns the favicon as a base64 string, or an empty string if the request fails
 */
#[tokio::main]
async fn pass_website_icon(url: &str) -> String {
    let icon_url = format!("{}/favicon.ico", url);
    let icon_response = match reqwest::get(&icon_url).await {
        Ok(response) => response,
        Err(_) => return "".to_string(),
    };

    if icon_response.status().is_success() {
        let icon_bytes = match icon_response.bytes().await {
            Ok(bytes) => bytes,
            Err(_) => return "Error getting icon bytes".to_string(),
        };
        let icon_base64 = general_purpose::STANDARD.encode(&icon_bytes);
        return icon_base64.to_string();
    } else {
        return "".to_string();
    }
}

/**
 * get_website_data is a asynchronous function called from the frontend that attempts to get the status code of a website and emit the event to the frontend
 * @param {&str} url - the website to get the status from
 * @param {&str} id - the id of the website
 * @param {Window} window - the Tauri window context
 * @returns {void} - emits the event with the status payload to the frontend
 */
#[tauri::command]
fn get_website_data(url: &str, id: &str, window: Window) {
    let (tx, rx) = mpsc::channel();
    let owned_url = url.to_string();
    tx.send(owned_url).unwrap();
    let owned_id = id.to_string();
    let cloned_id = owned_id.clone();
    tx.send(owned_id).unwrap();
    thread::spawn(move || {
        let url = rx.recv().unwrap();
        let status = pass_website_data(&url);

        window
            .emit_all(
                cloned_id.as_str(),
                StatusPayload {
                    status_payload: status.to_string(),
                },
            )
            .unwrap();
    });
}

/**
 * get_website_icon is a asynchronous function called from the frontend that attempts to get the favicon of a website and emit the event to the frontend
 * @param {&str} url - the website to get the favicon from
 * @param {&str} id - the id of the website
 * @param {Window} window - the Tauri window context
 * @returns {void} - emits the event with the icon payload to the frontend
 */
#[tauri::command]
fn get_website_icon(url: &str, id: &str, window: Window) {
    let (tx, rx) = mpsc::channel();
    let owned_url = url.to_string();
    tx.send(owned_url).unwrap();
    let owned_id = id.to_string();
    let cloned_id = owned_id.clone();
    tx.send(owned_id).unwrap();
    thread::spawn(move || {
        let url = rx.recv().unwrap();
        let icon_string = pass_website_icon(&url);

        window
            .emit_all(
                cloned_id.as_str(),
                IconPayload {
                    icon_payload: icon_string,
                },
            )
            .unwrap();
    });
}

/**
 * main function that runs the Tauri application
 */
fn main() {
    tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![get_website_data, get_website_icon])
        .plugin(tauri_plugin_window_state::Builder::default().build())
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}


// App originally created by:
// _____    _    _   _ ___
// |  _ \  / \  | \ | |_ _|
// | | | |/ _ \ |  \| || |
// | |_| / ___ \| |\  || |
// |____/_/   \_|_| \_|___|