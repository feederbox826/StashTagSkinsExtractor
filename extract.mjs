import { fileTypeFromBuffer } from 'file-type'
import fs from 'fs'

async function extractImageFromFile (folderName, filepath) {
  // get name of file
  const data = JSON.parse(fs.readFileSync(filepath, 'utf8'))
  // decode base64
  let buff = Buffer.from(data.image, "base64")
  const fileType = await fileTypeFromBuffer(buff.buffer)
  const filename = data.name.replace("/", "-")
  if (fileType) {
    const ext = fileType.ext
    // write to file
    fs.writeFileSync(`./output/${folderName}/${filename}.${ext}`, buff)
    console.log(`Image saved as ${filename}.${ext}`)
  } else {
    console.log('File type not recognized')
  }
}

function extractImageFromFolder (folderName) {
  // get all files in folder
  const folderPath = `./StashTagSkins/Library/${folderName}`
  const files = fs.readdirSync(folderPath)
  // iterate over files
  files.forEach(file => {
    // check if file is a json file
    if (file.endsWith('.json')) {
      // extract image from file
      extractImageFromFile(folderName, `${folderPath}/${file}`)
      fs.accessSync(`./output/${folderName}`)
    }
  })
}

// interate over folders\
extractImageFromFolder('HamsterTags')
extractImageFromFolder('Icons')
