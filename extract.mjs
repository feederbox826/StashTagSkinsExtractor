import { fileTypeFromBuffer } from 'file-type'
import fs from 'fs'

async function extractImageFromFile (folder, filepath) {
  // get name of file
  const data = JSON.parse(fs.readFileSync(filepath, 'utf8'))
  // decode base64
  let buff = Buffer.from(data.image, "base64")
  const fileType = await fileTypeFromBuffer(buff.buffer)
  const filename = data.name.replace("/", "-")
  if (fileType) {
    const ext = fileType.ext
    // write to file
    fs.writeFileSync(`./output/${folder}/${filename}.${ext}`, buff)
    console.log(`Image saved as ${filename}.${ext}`)
  } else {
    console.log('File type not recognized')
  }
}

function extractImageFromFolder (folder) {
  // get all files in folder
  const files = fs.readdirSync(`./Library/${folder}`)
  // iterate over files
  files.forEach(file => {
    // check if file is a json file
    if (file.endsWith('.json')) {
      // extract image from file
      extractImageFromFile(folder, `./Library/${folder}/${file}`)
      fs.accessSync(`./output/${folder}`)
    }
  })
}

// interate over folders\
extractImageFromFolder('HamsterTags')
extractImageFromFolder('Icons')
