const puppeteer = require('puppeteer');


(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto('https://sos2021-08.herokuapp.com/');
  await page.screenshot({ path: 'init_statewiseTestingdetails.png' });

  console.log("Página abierta");

  const [response] = await Promise.all([
    page.waitForNavigation(),
    page.click("body > main > main > div > div:nth-child(12) > div > div:nth-child(3) > div.card-body > a:nth-child(3) > button"),
  ]);

  await page.screenshot({ path: 'clickOnAPiv1Button_stateWiseTestingDetails.png' });

  console.log("Click en api v1");
  
  await page.goto('https://sos2021-08.herokuapp.com/');
  console.log("Vuelta a Home");

  const [response1] = await Promise.all([
    page.waitForNavigation(),
    page.click("body > main > main > div > div:nth-child(12) > div > div:nth-child(3) > div.card-body > a:nth-child(4) > button"),
  ]);
  console.log("Click en Interfaz");
  await page.waitForTimeout(1000);
  console.log("Timeout superado haciendo captura");

  await page.screenshot({ path: 'clickOnInterfazButton_statewise.png' });


//NO ES NECESARIO POR EL TIME OUT  await page.waitForSelector();
 /* 
    var rowCount = (await page.$$("body > main > main > table > tbody:nth-child(3)")).length;

    console.log(`Initial rowCount = ${rowCount}`);

    */

    page.click("body > main > main > div:nth-child(1) > button:nth-child(4)")
  
    console.log("Click en Insertar");

    await page.waitForTimeout(1000);
    console.log("Timeout superado haciendo captura");

    await page.screenshot({ path: 'clickOnInsertarButton_stateWise.png' });


    console.log("Insertando nuevo dato");
    await page.$eval('#modal > div > div.modal.show.d-block > div > div > div.modal-body > tr > table > tbody > tr:nth-child(1) > td:nth-child(2) > input', el => el.value = '2020-12-12');
    await page.$eval('#modal > div > div.modal.show.d-block > div > div > div.modal-body > tr > table > tbody > tr:nth-child(2) > td:nth-child(2) > input', el => el.value = 'New York');
    await page.$eval('#modal > div > div.modal.show.d-block > div > div > div.modal-body > tr > table > tbody > tr:nth-child(3) > td:nth-child(2) > input', el => el.value = '12');
    await page.$eval('#modal > div > div.modal.show.d-block > div > div > div.modal-body > tr > table > tbody > tr:nth-child(4) > td:nth-child(2) > input', el => el.value = '1997');
    await page.$eval('#modal > div > div.modal.show.d-block > div > div > div.modal-body > tr > table > tbody > tr:nth-child(5) > td:nth-child(2) > input', el => el.value = '12');
   

    await page.screenshot({ path: 'clickOnInsertarDato_stateWise.png' });

    
    await page.click("#modal > div > div.modal.show.d-block > div > div > div.modal-footer > button.btn.btn-primary"),
    
    await page.waitForTimeout(1000);
    console.log("Timeout superado haciendo captura");

    console.log("Haciendo captura de insert exitoso (AUNQUE SABEMOS QUE LOS CAMPOS SE ENVIAN VACIOS, FALLO DE SVELTE")
    await page.screenshot({ path: 'clickOnInsertarConExito_statewise.png' });
  

  await browser.close();
  console.log("Navegador Cerrado");
})();