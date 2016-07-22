# Safe Shelter Collaborative Dashboard

A project for Caravan Studios, a division of TechSoup

The Safe Shelter Collaborative program finds shelter and funding alternatives for survivors of domestic violence and human trafficking.  This dashboard collects data from bed requests made by shelters and the responses.


## Technologies
stack (MEAN): 
  * AngularJ
  * Express
  * MongoDB
  * NodeJS

## Dependencies
* Bootstrap 3.2.0
* JQuery
* moment.js
* daterangepicker.js
* angular-daterangepicker.js
* csvtojson 1.0.0
* mongoose 4.5.1

##Configuration
	
To configure:

1. install node and mongodb
2. ```npm install```
3. In root of the app, create a .env file
Add these constants:
```REGIONS="region_name1,region_name2,region_name3"``` substituting your custom region names, no space after commas
	```MONGODB_URL=<your db url here>```
4. In dashboard.config.js:

 ```const OUTCOMEURL= <your host url/api/outcomes>```
 
 ```
 const REGIONFILTERS={region1:{value: "Wonderland", name: "Wonderland"}, region2:{value: "Atlantis", name: "Atlantis"},
region3:{value: "Mount+Olympus", name: "Mount Olympus"}}
```
(add your own region names, and use a + in place of any spaces in the value of value)
  ```var demo=false ``` change to true if test data only
  
  To seed with demo data:
   1. Go to db/fakedata.js and replace your region names in var regionOptns
   2. Open to mongo shell
   ```mongo```
   3. ```use <test db name>```
   4. ```load('db/fakedata.js')```
   5. ```createMultipleRecords(n)``` or ```createRecord()```
