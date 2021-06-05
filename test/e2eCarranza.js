const puppeteer = require('puppeteer');


(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto('https://sos2021-08.herokuapp.com/');
  await page.screenshot({ path: '/Users/Antonio Carranza/Desktop/SOS/SOS2021-08/test/e2eCarranzaCatpturas/init.png' });

  console.log("Página abierta");


  const [response] = await Promise.all([
    page.waitForNavigation(),
    page.click("body > main > main > div > div:nth-child(12) > div > div:nth-child(2) > div.card-body > a:nth-child(3) > button"),
  ]);

  await page.screenshot({ path: '/Users/Antonio Carranza/Desktop/SOS/SOS2021-08/test/e2eCarranzaCatpturas/clickOnAPiv1Button.png' });

  console.log("Click en api v1");
  
  await page.goto('https://sos2021-08.herokuapp.com/');
  console.log("Vuelta a Home");

  const [response1] = await Promise.all([
    page.waitForNavigation(),
    page.click("body > main > main > div > div:nth-child(12) > div > div:nth-child(2) > div.card-body > a:nth-child(4) > button"),
  ]);
  console.log("Click en Interfaz");
  await page.waitForTimeout(1000);
  console.log("Timeout superado haciendo captura");

  await page.screenshot({ path: '/Users/Antonio Carranza/Desktop/SOS/SOS2021-08/test/e2eCarranzaCatpturas/clickOnInterfazButton.png' });


//NO ES NECESARIO POR EL TIME OUT  await page.waitForSelector();
 /* 
    var rowCount = (await page.$$("body > main > main > table > tbody:nth-child(3)")).length;

    console.log(`Initial rowCount = ${rowCount}`);

    */

    page.click("body > main > main > div:nth-child(1) > button:nth-child(3)")
  
    console.log("Click en Insertar");

    await page.waitForTimeout(1000);
    console.log("Timeout superado haciendo captura");

    await page.screenshot({ path: '/Users/Antonio Carranza/Desktop/SOS/SOS2021-08/test/e2eCarranzaCatpturas/clickOnInsertarButton.png' });


    console.log("Insertando nuevo dato");
    await page.$eval('#Fecha', el => el.value = '2020-12-12');
    await page.$eval('#Condado', el => el.value = 'New York');
    await page.$eval('#Estado', el => el.value = 'Texas');
    await page.$eval('#Fips', el => el.value = 1997);
    await page.$eval('#Casos', el => el.value = 12);
    await page.$eval('#Muertes', el => el.value = 12);

    await page.screenshot({ path: '/Users/Antonio Carranza/Desktop/SOS/SOS2021-08/test/e2eCarranzaCatpturas/clickOnInsertarDato.png' });

    page.click("#BtnInsertar")


    console.log("Haciendo captura de insert exitoso")
    await page.screenshot({ path: '/Users/Antonio Carranza/Desktop/SOS/SOS2021-08/test/e2eCarranzaCatpturas/clickOnInsertarConExito.png' });
    
    


  
  

  await browser.close();
  console.log("Navegador Cerrado");
})();