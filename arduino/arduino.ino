#include <ESP8266WiFi.h>
#include <ESP8266HTTPClient.h>

const char *ssid = "colddsam";
const char *password = "give_up_on_your_dreams_and_die";
String endPoint = "https://health-care-system-g2rl.onrender.com";
String deviceID = "627865";

void wifiConnect()
{
  WiFi.begin(ssid, password);
  Serial.print("Connecting to WiFi...");
  while (WiFi.status() != WL_CONNECTED)
  {
    delay(500);
    Serial.print(".");
  }
  Serial.println("WiFi connected");
  Serial.print("IP address : ");
  Serial.println(WiFi.localIP());
}

void apiCall(float heart_rate, float spo2, float temperature)
{
  String payload = "{\"heart_rate\":" + String(heart_rate) + ",";
  payload += "\"spo2\":" + String(spo2) + ",";
  payload += "\"temperature\":" + String(temperature) + "}";

  if (WiFi.status() == WL_CONNECTED)
  {
    WiFiClientSecure client;
    client.setInsecure();
    HTTPClient http;
    String serverAddress = endPoint + "/append/?" + "_id=" + deviceID;
    http.begin(client, serverAddress);
    http.addHeader("Content-Type", "application/json");

    int httpCode = http.POST(payload);

    if (httpCode > 0)
    {
      Serial.print("HTTP response code: ");
      Serial.println(httpCode);

      if (httpCode == HTTP_CODE_OK)
      {
        String response = http.getString();
        Serial.println("Server response:");
        Serial.println(response);
      }
      else
      {
        Serial.println("HTTP request failed");
      }
    }
    else
    {
      Serial.print("Error on HTTP request: ");
      Serial.println(http.errorToString(httpCode).c_str());
    }

    http.end();
  }
}

void setup()
{
  Serial.begin(9600);
  while (!Serial);
  wifiConnect();
}

void loop()
{
  float heart_rate = 75.5;
  float spo2 = 98.5;
  float temperature = 36.8;
  apiCall(heart_rate, spo2, temperature);
  delay(5000);
}
