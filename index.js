import { createInterface } from 'readline';
import clipboard from 'clipboardy';

const convert = (from, to) => str => Buffer.from(str, from).toString(to)
const utf8ToHex = convert('utf8', 'hex')

const addPercentBetweenHex = (hexString) => {
    const hexArray = hexString.match(/.{1,2}/g);
    const result = hexArray.join('%');
    return result;
};

const rl = createInterface({
    input: process.stdin,
    output: process.stdout
});

function app() {
    rl.question('[\x1b[38;5;214m=\x1b[0m] Enter link to send (example: sanago.xyz):', (link) => {
        if (!link) {
            console.log('[\x1b[31mKO\x1b[0m] No link entered. Exiting...');
            rl.close();
            return;
        }
        const slashIndex = link.indexOf('/') + 1;
        let path = '';
        if (slashIndex == 0)
            path = link;
        else 
            path = link.substring(slashIndex + 1);
        const asciiToHex = addPercentBetweenHex(utf8ToHex(path));
        clipboard.writeSync(`<ht\ntp\ns:/\\%${asciiToHex}>`);
        console.log('[\x1b[32mOK\x1b[0m] Copied !\n');
        app();
    });
}
app();