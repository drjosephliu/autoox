# Rothberg Catalyzer Makerthon

## Auto-Ox Oxygen Titration Device

### Scope
COPD (Chronic Obstructive Pulmonary Disease) patients that are on long-term oxygen therapy need to stay within the optimal range of 88-92% oxygen saturations. However, the current method of oxygen therapy doesn't have a way to titrate the amount of oxygen released depending on the patient's oxygen saturation reading.

### Idea
Our team created a custom 3D printed attachment to a oxygen canister that was attached to an Arduino servo motor through use of elastic bands. Simultaneously, an oxygen saturation sensor is attached to the patient's finger. If the oxygen sat reading was too low (i.e. <88%), then the servo motor would turn triggering release of oxygen. The motor would stop rotating until the sensor detected that oxygen sat reading was too high (i.e. >92%).

### Setup

Code for the Arduino can be found in `/arduino/autoox.c`. Simply copy and paste into a new sketch in the Arduino app.

For the final demo, the pulse oximeter was found to be inaccurate, so oxygen saturation readings were simulated by typing in random numbers into the `data.txt` file.

To run:
```
npm run dev
```

Ensure Arduino is successfully attached and code has been uploaded. Then in `data.txt`, type in numbers between 0-100 followed by backslash. E.g.:
```
97\
85\
83\
```
