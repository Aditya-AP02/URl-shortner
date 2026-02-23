// this page shows the difference beetweeen blocking and non blicking opetations

// Blocking operation --> Synchronous operation 
// Non blocking operation --> Asynchronous operation

const fs = required("fs")

const sync= fs.writeFileSync('example.txt', 'Hello, World!', 'utf8');
console.log('File written successfully.');

fs.writeFile('text.txt', 'this is sample text file', (err) => {
  if (err) throw err ;
  console.log("Successfully created second file. ");
  }
else {
  console.log("Error in creating file.");
})