'use server';

export async function process() {
  // get time in format yyyy/mm/dd hh:mm:ss in one line
  const date = new Date();
  const time = `${date.getFullYear()}/${
    date.getMonth() + 1
  }/${date.getDate()} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;

  console.log({ time: time });
}
