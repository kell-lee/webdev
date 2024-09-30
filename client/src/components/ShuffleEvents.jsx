export default function shuffleEvents(array) {
  let currentIndex = array.length;

  while (currentIndex > 0) {
    // assign index
    let randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // swap it with two random elements in place
    [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
  }

  return array;
}
