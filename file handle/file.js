const fs = require('fs');


// fs.writeFileSync('example.txt', 'Hello, World!', 'utf8');
// console.log('File written successfully.');

// fs.writeFileSync('text.txt', 'this is sample text file')
// console.log("Successfully created second file. ");

// suncronous read file
// const result = fs.readFileSync('contactreadfile.txt', 'utf8')
// console.log(result);

// asynchronous read file  
fs.readFile('contactreadfile.txt', 'utf8' , (err, result) => {
    if (err) {
        console.error('Error reading file:', err);
        return;
    } 
    else {
        console.log('Asynchronous read:', result);
    }
}
  
)


