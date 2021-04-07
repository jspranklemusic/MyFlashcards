const bcrypt = require('bcrypt')


async function main(){
    const hashed1 = await bcrypt.hash("Hello",1);
    const hashed2 = await bcrypt.hash("Hello",1);

    console.log(await bcrypt.compare("Hello",hashed2))
    console.log(await bcrypt.compare("Hello",hashed1))
}

main();