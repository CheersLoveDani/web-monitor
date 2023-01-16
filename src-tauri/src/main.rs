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

#[derive(Clone, serde::Serialize)]
struct Payload {
  status_payload: String,
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
        
            window.emit_all(cloned_id.as_str(), Payload { status_payload: status.to_string() }).unwrap();
        
    });
}

fn main() {
    tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![greet, get_website_data])
        .plugin(tauri_plugin_window_state::Builder::default().build())
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
