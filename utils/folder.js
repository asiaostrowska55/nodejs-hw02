const path = require("path");
const fs = require("fs").promises;

const accessible = async (path) => {
  try {
    await fs.access(path);
    return true;
  } catch {
    return false;
  }
};

const createFolder = async (folder) => {
  if (!(await accessible(folder))) {
    await fs.mkdir(folder, { recursive: true });
  }
};

const verifyFolders = async () => {
  const uploadDir = path.join(process.cwd(), "tmp");
  const storeImage = path.join(process.cwd(), "public", "avatars");

  await createFolder(uploadDir);
  await createFolder(storeImage);
};

module.exports = { verifyFolders };
