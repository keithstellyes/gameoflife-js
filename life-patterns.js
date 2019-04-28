function parsePattern(src) {
  const lines = src.split('\n');

  const pat = [];
  for(let y = 0; y < lines.length; y++) {
    let x = 0;
    for(let i = 0; i < lines[y].length; i++) {
      if(lines[y][i] == 'X') {
        pat.push([x, y]);
        x += 1;
      } else if(lines[y][i] == '.') {
        x += 1;
      }
    }
  }

  return pat;
}

const PATTERNS = {
  glider:parsePattern(". X .\n" +
                      ". . X\n" +
                      "X X X"),
  beaconHorizontal:parsePattern("XXX"),
  beaconVertical:parsePattern("X\nX\nX"),
  gosperGliderGun:parsePattern(". . . . . . . . . . . . . . . . . . . . . . . . X . . . . . . . . . . .\n" +
                               ". . . . . . . . . . . . . . . . . . . . . . X . X . . . . . . . . . . .\n" +
                               ". . . . . . . . . . . . X X . . . . . . X X . . . . . . . . . . . . X X\n" +
                               ". . . . . . . . . . . X . . . X . . . . X X . . . . . . . . . . . . X X\n" +
                               "X X . . . . . . . . X . . . . . X . . . X X . . . . . . . . . . . . . .\n" +
                               "X X . . . . . . . . X . . . X . X X . . . . X . X . . . . . . . . . . .\n" +
                               ". . . . . . . . . . X . . . . . X . . . . . . . X . . . . . . . . . . .\n" +
                               ". . . . . . . . . . . X . . . X . . . . . . . . . . . . . . . . . . . .\n" +
                               ". . . . . . . . . . . . X X. . . . . . . . . . . . . . . . . . . . . . ")
};
