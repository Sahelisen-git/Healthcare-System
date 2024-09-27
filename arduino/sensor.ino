#include <ESP8266WiFi.h>
#include <ESP8266HTTPClient.h>

const char *ssid = "Espal";
const char *password = "Espal192003";
String endPoint = "https://health-care-system-owcv.onrender.com";
String deviceID = "100";
int flag = 0;
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

void smtpCall(float spo2)
{
  String payload = "{\"value\":" + String(spo2) + ",";
  payload += "\"id\":\"" + deviceID + "\"}";

  if (WiFi.status() == WL_CONNECTED)
  {
    WiFiClientSecure client;
    client.setInsecure();
    HTTPClient http;
    String serverAddress = endPoint + "/sendmail/";
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

void apiCall(float heart_rate, float spo2, float temperature, float ECGSignal)
{
  String payload = "{\"heart_rate\":" + String(heart_rate) + ",";
  payload += "\"spo2\":" + String(spo2) + ",";
  payload += "\"temperature\":" + String(temperature) + ",";
  payload += "\"ECGSignal\":" + String(ECGSignal) + "}";

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
  Serial.begin(115200);
  Serial.print("Connected");
  while (!Serial)
    ;
  wifiConnect();
}

void loop()
{
  if (Serial.available() > 0)
  {
    String data = Serial.readStringUntil('\n');
    int a = data.indexOf('e');
    int c = data.indexOf('h');
    int d = data.indexOf('o');
    if (c != -1 || d != -1 || a != -1)
    {
      float ECGSignal = data.substring(0, a).toFloat();
      float heart_rate = data.substring(a + 1, c).toFloat();
      float spo2 = data.substring(c + 1, d).toFloat();
      float temperature = data.substring(d + 1).toFloat();
      apiCall(heart_rate, spo2, temperature, ECGSignal);
      Serial.print("HeartRate: ");
      Serial.println(heart_rate);
      Serial.print("SPO2: ");
      Serial.println(spo2);
      Serial.print("Temp: ");
      Serial.println(temperature);
      if (spo2 > -1.0)
      {
        if ((flag == 0) && (spo2 < 90))
        {
          smtpCall(spo2);
        }
        if (spo2 < 90)
        {
          flag++;
        }
        else
        {
          flag = 0;
        }
        if (flag == 100)
        {
          flag = 0;
        }
      }
    }
  }
}