/**
 * Gets the random int.
 *
 * @param      {<type>}  max     The maximum
 * @return     {<type>}  The random int.
 */
function getRandomInt2(min, max) {
  return Math.floor(Math.random() * Math.floor(max));
}


function getRandomInt(min = 0, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}