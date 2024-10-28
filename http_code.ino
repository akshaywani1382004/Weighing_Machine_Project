// python -m http.server 8000 
// http://localhost:8000/

#include <WiFi.h>
#include <WebServer.h>

const char* ssid = "Akshay";    
const char* password = "13082004"; 

WebServer server(80);

String sensorData = "No Data Given..."; 

void handleRoot() {
  server.sendHeader("Access-Control-Allow-Origin", "*");
  server.send(200, "text/plain", "ESP32");
}

void handleData() {
  server.sendHeader("Access-Control-Allow-Origin", "*");
  server.send(200, "application/json", "{\"data\":\"" + sensorData + "\"}");
}

void setup() {
  Serial.begin(115200);

  WiFi.begin(ssid, password);
  while (WiFi.status() != WL_CONNECTED) {
    delay(1000);
    Serial.println("Connecting to WiFi...");
  }
  Serial.println("Connected to WiFi");

  Serial.print("ESP32 IP Address: ");
  Serial.println(WiFi.localIP());

  server.on("/", handleRoot);
  server.on("/getData", handleData);

  server.begin();
  Serial.println("HTTP server started");
}

void loop() {
  server.handleClient(); 

  if (Serial.available()) {
    sensorData = Serial.readStringUntil('\n');
    Serial.print("Updated sensorData: ");
    Serial.println(sensorData);
  }
}
