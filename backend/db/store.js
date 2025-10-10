const fs = require('fs-extra');
const path = require('path');
const DBFILE = process.env.DB_PATH || path.join(__dirname, 'data.json');

async function read() {
  try {
    const raw = await fs.readFile(DBFILE, 'utf8');
    return JSON.parse(raw);
  } catch (err) {
    return { users: [], bookmarks: [], lastId: 0 };
  }
}

async function write(data) {
  await fs.outputFile(DBFILE, JSON.stringify(data, null, 2), 'utf8');
}

async function createUser({ name, email, password_hash }){
  const data = await read();
  const id = ++data.lastId;
  data.users.push({ id, name, email, password_hash, current_chapter:1, current_verse:1, streak_count:0, last_read_date: null });
  await write(data);
  return id;
}

async function findUserByEmail(email){
  const data = await read();
  return data.users.find(u=>u.email===email);
}

async function findUserById(id){
  const data = await read();
  return data.users.find(u=>u.id===id);
}

async function updateProgress(id, chapter, verse){
  const data = await read();
  const user = data.users.find(u=>u.id===id);
  if (!user) return false;
  user.current_chapter = chapter;
  user.current_verse = verse;
  user.last_read_date = new Date().toISOString();
  await write(data);
  return true;
}

async function addBookmark(userId, chapter, verse){
  const data = await read();
  const id = ++data.lastId;
  data.bookmarks.push({ id, user_id: userId, chapter, verse, created_at: new Date().toISOString() });
  await write(data);
  return id;
}

async function getBookmarks(userId){
  const data = await read();
  return data.bookmarks.filter(b=>b.user_id===userId).sort((a,b)=>new Date(b.created_at)-new Date(a.created_at));
}

module.exports = { read, write, createUser, findUserByEmail, findUserById, updateProgress, addBookmark, getBookmarks };
