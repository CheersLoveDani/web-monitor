#![cfg_attr(
    all(not(debug_assertions), target_os = "windows"),
    windows_subsystem = "windows"
)]

// use std::collections::HashMap;
// use http::StatusCode; 
// use http::{Request,Response};

// Learn more about Tauri commands at https://tauri.app/v1/guides/features/command
#[tauri::command]
fn greet(name: &str) -> String {
    format!("Hello, {}! You've been greeted from Rust!", name)
}


// #[tokio::main]
// async fn get_website_data(website: &str) -> Result<(), Box<dyn std::error::Error>> {
//     let resp = reqwest::get(website)
//         .await?
//         .json::<HashMap<String, String>>()
//         .await?;
//     println!("{:#?}", resp);
//     Ok(())
// }

use std::thread;
use std::sync::mpsc;
use tauri::{Manager, Window};
use base64::{Engine as _, engine::{general_purpose}};

#[derive(Clone, serde::Serialize)]
struct StatusPayload {
  status_payload: String,
  
}

#[derive(Clone, serde::Serialize)]
struct IconPayload {
    icon_payload: String,
}


#[tokio::main]
async fn pass_website_data(url: &str) -> String {
    match reqwest::get(url).await{
        Ok(response) => {
            return response.status().to_string()
        }
        Err(_) => {
            return "No OK response".to_string()
        }
    }
}

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

#[tauri::command]
fn get_website_data(url: &str, id: &str, window:Window) {
    let (tx, rx) = mpsc::channel();
    let owned_url = url.to_string();
    tx.send(owned_url).unwrap();
    let owned_id = id.to_string();
    let cloned_id = owned_id.clone();
    tx.send(owned_id).unwrap();
     thread::spawn(move || {
        let url = rx.recv().unwrap();
        let status = pass_website_data(&url);
        
            window.emit_all(cloned_id.as_str(), StatusPayload { status_payload: status.to_string() }).unwrap();
        
    });
}

#[tauri::command]
fn get_website_icon(url: &str, id: &str, window:Window) {
    let (tx, rx) = mpsc::channel();
    let owned_url = url.to_string();
    tx.send(owned_url).unwrap();
    let owned_id = id.to_string();
    let cloned_id = owned_id.clone();
    tx.send(owned_id).unwrap();
     thread::spawn(move || {
        let url = rx.recv().unwrap();
        let icon_string = pass_website_icon(&url);
        
            window.emit_all(cloned_id.as_str(), IconPayload { icon_payload: icon_string }).unwrap();
        
    });
}

fn main() {
    tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![greet, get_website_data, get_website_icon])
        .plugin(tauri_plugin_window_state::Builder::default().build())
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
