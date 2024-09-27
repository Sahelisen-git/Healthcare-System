#include <ESP8266WiFi.h>
#include <ESP8266HTTPClient.h>

const char *ssid = "colddsam";
const char *password = "give_up_on_your_dreams_and_die";
String url = "https://health-care-system-g2rl.onrender.com";
String deviceID = "100";
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

void makeHttpRequest()
{
    if (WiFi.status() == WL_CONNECTED)
    {
        WiFiClientSecure client;
        client.setInsecure();
        HTTPClient http;

        String serverAddress = url + "/data/?_id=" + deviceID;

        http.begin(client, serverAddress);

        int httpCode = http.GET();

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
    else
    {
        Serial.println("WiFi not connected, unable to make HTTP request");
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

    makeHttpRequest();
    delay(3000);
}
