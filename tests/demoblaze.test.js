const {Builder, By, Key, until, Alert} = require('selenium-webdriver');

require("chromedriver");

describe ('DemoBlaze Website', () => {

    //Launch browser
    let driver =  new Builder().forBrowser("chrome").build();

    jest.setTimeout(30000);
  
    test('Add to Cart', async () => {
        //your code inside this block
        await driver.get("https://www.demoblaze.com/");
    
        await driver.wait(until.elementLocated(By.xpath("//a[normalize-space(text())='Laptops']"))); 
        await driver.findElement(By.xpath("//a[normalize-space(text())='Laptops']")).click();

        await driver.wait(until.elementLocated(By.xpath("//a[normalize-space(text())='MacBook Pro']")));
        await driver.findElement(By.xpath("//a[normalize-space(text())='MacBook Pro']")).click();

        await driver.wait(until.elementLocated(By.xpath("//a[normalize-space(text())='Add to cart']")));
        await driver.findElement(By.xpath("//a[normalize-space(text())='Add to cart']")).click();

        await driver.wait(until.alertIsPresent());
        await driver.switchTo().alert().accept();

        await driver.wait(until.elementLocated(By.id("cartur")));
        await driver.findElement(By.id("cartur")).click();

        await driver.wait(until.elementLocated(By.xpath("//table/tbody/tr/td[3]")));

        let dataTable = await driver.findElement(By.xpath("//table/tbody/tr/td[3]")).getText();
        // let currentUrl = await driver.getCurrentUrl();
        console.log('Data: '+dataTable);

        // Assertion
        expect(dataTable).toEqual("1100");
    })

    test('Sign Up', async () => {
        //your code inside this block
        await driver.get("https://www.demoblaze.com/");

        await driver.wait(until.elementLocated(By.id("signin2")));
        await driver.findElement(By.id("signin2")).click();

        await driver.wait(until.elementLocated(By.xpath("//div[@id='signInModal' and contains(@style,'display: block')]")));
        await driver.findElement(By.id('sign-username')).sendKeys("username");
        await driver.findElement(By.id('sign-password')).sendKeys("password");

        let signUpButton = await driver.findElement(By.xpath("//button[@onclick='register()']"));
        await driver.wait(until.elementIsEnabled(signUpButton, 20000));
        await driver.executeScript("arguments[0].click();", signUpButton);

        await driver.wait(until.alertIsPresent());
        let alert = await driver.switchTo().alert();

        //Store the alert text in a variable
        let alertText = await alert.getText();
        console.log('Alert text:'+alertText);

        expect(alertText).toEqual("This user already exist.");
    })
    
})

// Run in fullscreen
// driver.manage().window().maximize();