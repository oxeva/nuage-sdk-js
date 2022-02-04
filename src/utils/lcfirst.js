/**
 * Make a string's first character lowercase
 *
 * lcfirst('HelloWorld');   // 'helloWorld'
 * lcfirst(12);             // 12
 * lcfirst(false);          // false
 */
export default function lcfirst(str) {
    if (typeof str === 'string') {
        return str[0].toLocaleLowerCase() + str.substring(1);
    }

    return str;
}
