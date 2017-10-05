var fs = require("fs");
var open = require("open");
var scrapeIt = require("scrape-it");
var jsonfile = require("jsonfile");
var webdriver = require("selenium-webdriver"),
    By = webdriver.By,
    until = webdriver.until;
var firefox = require('selenium-webdriver/firefox');

var binary = new firefox.Binary('./Firefox.app/Contents/MacOS/firefox');
// binary.addArguments("-headless");

var driver = new webdriver.Builder()
    .forBrowser('firefox')
    .setFirefoxOptions(new firefox.Options().setBinary(binary))
    .build();

var file = "db.json";
var arr = { "hotels": [] };

function sc(pq) {
    driver.get('https://www.tripadvisor.com/Hotels-g293932-Yerevan-Hotels.html');
    for (var i = 1; i <= pq; i++) {
        if (i != 1)
            driver.sleep(5000).then(() => {
                driver.findElement(
                    By.css('.next')
                ).click();
            });

        driver.sleep(5000).then(function () {

            driver.getPageSource().then(function (html) {
                // console.log(html)
                // f = 'file' + marz_num + '.html'
                // fs.writeFile(f, html, function (err) {
                //     if (err) { throw (err); };
                //     console.log(__dirname + f);
                //     open('file://' + __dirname + '/' + f);
                // });

                var datax = scrapeIt.scrapeHTML(html, {
                    hotels: {
                        listItem: ".prw_meta_hsx_three_col_listing",
                        data: {
                            image: {
                                selector: '.photo_image',
                                attr: "src"
                            },
                            title: ".property_title",
                            price: {
                                selector: ".priceBlock .price",
                                convert: function (x) {
                                    return x ? Number(x.split("AMD ")[1].split(",").join("")) : 0;
                                }
                            },
                            rating: {
                                selector: '.prw_common_rating_and_review_count .ui_bubble_rating',
                                attr: "alt",
                                convert: function (x) {
                                    var y = Number(x.split(" of 5 bubbles")[0]);
                                    return (x && y < 0) ? 0 : y;
                                }
                            },
                            url: {
                                selector: ".property_title",
                                attr: "href"
                            }
                        }
                    }
                });

                arr.hotels.push(...datax.hotels);

                jsonfile.writeFile(file, arr, { spaces: 2 }, function (err) {
                    console.error(err);
                });
            });
        });
    }
}

sc(3);

driver.quit();