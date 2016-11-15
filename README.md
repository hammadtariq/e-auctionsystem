# E-Auction

## Description 

An e-auction system in which you can put your inventory items for auction and other users can do bidding in realtime.

Front-end: Angular and Angular Material
Back-end: mySql and NodeJS with Express

## Steps to run

1. git clone [url]
2. cd auctionSystem
3. npm install
4. bower install
5. type npm start in terminal
6. open http://localhost:4000 in browser

## To initialize database:
1. use any SQL file executable tool(preferred "Workbench").
2. Open workbench.
3. choose option from menubar file->Run SQL script.

## To setup database credentials for connectivity.
1. Open project
2. cd server/config
3. Open config.js in any text editor
4. set credentials according to your MySQL environment 

## Steps to tests
1. Open terminal on project root directory.
2. run 'mocha test/test_server.js'