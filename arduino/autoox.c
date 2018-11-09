#include <Servo.h>

Servo servo;
uint32_t next;
String inString = "";

void setup() {
  // put your setup code here, to run once:
  Serial.begin(9600);
  servo.attach(6, 1000, 2000);
  next = millis() + 500;
  Serial.println("hello");

}


void loop() {

  if (Serial.available() > 0) {
    while (Serial.available() > 0) {
      int inChar = Serial.read();
      if (isDigit(inChar)) {
        inString += (char)inChar;
      }

      if (inChar == '\\') {
        Serial.print("Value: ");
        Serial.println(inString.toInt());
        Serial.print("String: ");
        Serial.println(inString);

        int pulseOx = inString.toInt();

        if (pulseOx < 88) {
          servo.write(0);
        } else {
          servo.write(360);
        }



        inString = "";
      }
    }

    next += 3000;
  }
}
