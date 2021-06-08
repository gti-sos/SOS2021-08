const puppeteer = require('puppeteer');

//donde path , cambiar nombre rollo ....germany

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto('https://sos2021-08.herokuapp.com/');
  await page.screenshot({ path: 'init_covid19ger.png' });

  console.log("Página abierta");


  const [response] = await Promise.all([
    page.waitForNavigation(),
    page.click("body > main > main > div > div:nth-child(12) > div > div:nth-child(1) > div.card-body > a:nth-child(3) > button"),
  ]);

  await page.screenshot({ path: 'clickOnAPiv1Button_covid19Ger.png' });

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

  await page.screenshot({ path: 'clickOnInterfazButton_covid19GER.png' });


//NO ES NECESARIO POR EL TIME OUT  await page.waitForSelector();
 /* 
    var rowCount = (await page.$$("body > main > main > table > tbody:nth-child(3)")).length;

    console.log(`Initial rowCount = ${rowCount}`);

    */
    page.click("#intGER");
  
    console.log("Click en Insertar");

    await page.waitForTimeout(1000);
    console.log("Timeout superado haciendo captura");

    await page.screenshot({ path: 'clickOnInsertarButton_covidGER.png' });


    console.log("Insertando nuevo dato");
    await page.$eval('#Fecha', el => el.value = '2020-12-12');
    await page.$eval('#Condado', el => el.value = 'New York');
    await page.$eval('#Estado', el => el.value = 'Texas');
    await page.$eval('#Genero', el => el.value = '1997');
    await page.$eval('#GrupoEdad', el => el.value = '12');
    await page.$eval('#Casos', el => el.value = '12');
    await page.$eval('#Muertes', el => el.value = '12');
    await page.$eval('#Recuperados', el => el.value = '12');


    await page.screenshot({ path: 'clickOnInsertarDato_covidGER.png' });

    
    await page.click("#BtnInsertar2"),
    
    await page.waitForTimeout(1000);
    console.log("Timeout superado haciendo captura");

    console.log("Haciendo captura de insert exitoso (AUNQUE SABEMOS QUE LOS CAMPOS SE ENVIAN VACIOS, FALLO DE SVELTE")
    await page.screenshot({ path: 'clickOnInsertarConExito_us_counties.png' });
  */

  await browser.close();
  console.log("Navegador Cerrado");
})();