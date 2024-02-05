const { Builder, By, until, Browser } = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome');
(async () => {

    // let driver = await new Builder().forBrowser(Browser.CHROME).setChromeOptions(new chrome.Options().headless()).build();
    let driver = await new Builder().forBrowser(Browser.CHROME).setChromeOptions().build();

    try {
        
        await driver.get('https://colaborador.keycloud.cl/v4/BIO_Assistance/CO_login.php');
        const fs = require('fs');

        // Leer el archivo de manera sincrónica
        let credentials = fs.readFileSync('credenciales.txt', 'utf8');
        
        // Dividir las credenciales en correo electrónico y contraseña
        let [email, password] = credentials.split(',');

        const emailInput = await driver.findElement(By.id('correo'));

        await emailInput.sendKeys(email.trim()); // Ingresar correo
        
        const passwordInput = await driver.findElement(By.id('password'));
        await passwordInput.sendKeys(password.trim()); // Ingresar correo

        //find this element <button class="btn btn-google m-r-5" style="background-color:#2F2252 !important; border-color: #918e8d !important;" onclick="formhash(this.form, this.form.password);"><i class="btn-icon fa fa-user"></i> Ingresar al Portal</button>
        const submitButton = await driver.findElement(By.className('btn btn-google m-r-5'));
        //and click on submitButton

        await submitButton.click();

        await driver.sleep(2000)

        //find this element <button type="button" class="btn btn-success btn-lg btn-block btn-huge" id="btnAgregar" name="btnAgregar" data-id="I" data-text="Entrada" style="border:1px solid #000;"><i class="fa fa-sign-in" aria-hidden="true"></i>Entrada</button>
        // const submitButton2 = await driver.findElement(By.className('btn btn-success btn-lg btn-block btn-huge'));
        //find by name
        const submitButton2 = await driver.findElement(By.name('btnAgregar'));
        await driver.sleep(500)
        //and click on submitButton
        await submitButton2.click();
        await driver.sleep(500)
        //find this element <button type="button" class="btn btn-success btn-lg btn-block btn-huge" id="btnConfirmarM" name="btnConfirmarM" style="border:1px solid #000;"><i class="fa fa-check" aria-hidden="true"></i>Confirmar Marca</button>
        //find by name 
        const submitButton3 = await driver.findElement(By.name('btnConfirmarM'));
        await driver.sleep(500)
        //and click on submitButton
        await submitButton3.click();
        await driver.sleep(500)
        // END PROCESS
        
        exit(0);
        await driver.quit();
        // exit 0 to nodejs

    } finally {
        exit(0);
        await driver.quit();
    }
})();
