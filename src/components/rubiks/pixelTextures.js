import * as THREE from 'three';

/**
 * Procedural 8-bit Pixel Art Canvas Texture Generator
 * Creates crisp, nearest-neighbor filtered 128x128 textures for the 54 Rubik's cube sticker tiles.
 * Matches image_43.png, image_44.png, image_45.png, and image_46.png.
 * 
 * Color Palette:
 * - Pale Sage Background: #DCE3A5
 * - Base Plastic Shell: #0048FF (Cobalt/Ultramarine Blue)
 * - Tile Yellow: #FFF200
 * - Tile Royal Blue: #0048FF
 * - Tile White: #FFFFFF
 * - Tile Black: #0B0B0B
 * - Tile Pale Sage/Lemon: #EFF5B8
 */

const PALETTE = {
  Y: '#FFF200', // Bright Yellow
  U: '#0048FF', // Cobalt / Ultramarine Blue
  W: '#FFFFFF', // Clean White
  K: '#0B0B0B', // Deep Black
  L: '#EFF5B8', // Pale Sage / Lemon
};

// Helper: Renders an 8x8 pixel grid array onto a 128x128 canvas and returns a THREE.CanvasTexture
function createPixelTexture(grid, customColorMap = null) {
  const canvas = document.createElement('canvas');
  canvas.width = 128;
  canvas.height = 128;
  const ctx = canvas.getContext('2d');
  ctx.imageSmoothingEnabled = false;

  const rows = grid.length;
  const cols = grid[0].length;
  const cellW = canvas.width / cols;
  const cellH = canvas.height / rows;

  const colorMap = customColorMap || PALETTE;

  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      const char = grid[r][c];
      ctx.fillStyle = colorMap[char] || PALETTE.U;
      ctx.fillRect(c * cellW, r * cellH, cellW, cellH);
    }
  }

  // Draw subtle inner edge bevel for realistic physical sticker tile depth
  ctx.fillStyle = 'rgba(255, 255, 255, 0.22)';
  ctx.fillRect(0, 0, 128, 5);
  ctx.fillRect(0, 0, 5, 128);
  ctx.fillStyle = 'rgba(0, 0, 0, 0.28)';
  ctx.fillRect(0, 123, 128, 5);
  ctx.fillRect(123, 0, 5, 128);

  const texture = new THREE.CanvasTexture(canvas);
  texture.magFilter = THREE.NearestFilter;
  texture.minFilter = THREE.NearestFilter;
  texture.generateMipmaps = false;
  return texture;
}

// -----------------------------------------------------------------------------
// RIGHT FACE (+X): Solid Yellow (#FFF200) with Giant Black Pixel Spiral / "6"
// 3x3 tiles = 24x24 pixel grid perfectly matching image_43.png
// -----------------------------------------------------------------------------
const RIGHT_FACE_GRID_24x24 = [
  "YYYYYYYYYYYYYKKKKKKKKKKK",
  "YYYYYYYYYYYKKKKKKKKKKKKK",
  "YYYYYYYYYYKKKKKKKKKKKKKK",
  "YYYYYYYYYKKKKKKKKKKKKKKK",
  "YYYYYYYYKKKKKKKKKKKKKKKK",
  "YYYYYYYKKKKKKKKKKKKKKKKK",
  "YYYYYYYKKKKKKKKKKKKKKKKK",
  "YYYYYYKKKKKKKKKKKKKKKKKK",
  // Row 1 (Middle 8 rows)
  "YYYYYYKKKKKKKKKKKKKKKKKK",
  "YYYYYYKKKKKKKKKKKKKKKKKK",
  "YYYYYYKKKKKKKKKKKKKKKKKK",
  "YYYYYYKKKKKKKYYYYYYKKKKK",
  "YYYYYYKKKKKKKYYYYYYKKKKK",
  "YYYYYYKKKKKKKYYYYYYKKKKK",
  "YYYYYYKKKKKKKYYYYYYKKKKK",
  "YYYYYYKKKKKKKKKKKKKKKKKK",
  // Row 2 (Bottom 8 rows)
  "YYYYYYKKKKKKKKKKKKKKKKKK",
  "YYYYYYKKKKKKKKKKKKKKKKKK",
  "YYYYYYKKKKKKKKKKKKKKKKKK",
  "YYYYYYYKKKKKKKKKKKKKKKKK",
  "YYYYYYYYKKKKKKKKKKKKKKKK",
  "YYYYYYYYYKKKKKKKKKKKKKKK",
  "YYYYYYYYYYYKKKKKKKKKKKKK",
  "YYYYYYYYYYYYYKKKKKKKKKKK",
];

// -----------------------------------------------------------------------------
// FRONT FACE (+Z): Cobalt Blue (#0048FF) with White & Black 8-bit Pixel Glyphs
// Exactly matching image_43.png
// -----------------------------------------------------------------------------
// Row 0 (Top):
const FRONT_TOP_LEFT = [
  "KKKKKKKK",
  "KKKKKKKK",
  "KKKKKKKK",
  "KKKKKKKK",
  "KWWWWWWK",
  "WWWWWWWW",
  "WWWWWWWW",
  "WWWWWWWW",
];

const FRONT_TOP_MID = [
  "UWWUUWWU",
  "UWWUUWWU",
  "UWWUUWWU",
  "UUWWUUWW",
  "UUWWUUWW",
  "UUWWUUWW",
  "UWWUUWWU",
  "UWWUUWWU",
];

const FRONT_TOP_RIGHT = [
  "WWWWWWWW",
  "WWWWWWWW",
  "WWWWWWWW",
  "WWWWWWWW",
  "WWWWWWWW",
  "WWWWWWWW",
  "WWWWWWWW",
  "WWWWWWWW",
];

// Row 1 (Middle):
const FRONT_MID_LEFT = [
  "WWWWWWWW",
  "WWWKKWWW",
  "WWWKKWWW",
  "WKKKKKKW",
  "WKKKKKKW",
  "WWWKKWWW",
  "WWWKKWWW",
  "WWWWWWWW",
];

const FRONT_MID_MID = [
  "UUUUUUUU",
  "UWWUUWWU",
  "UWWUUWWU",
  "UUUUUUUU",
  "WWWWWWWW",
  "WWWWWWWW",
  "WWWWWWWW",
  "WWWWWWWW",
];

const FRONT_MID_RIGHT = [
  "UUUUUUWW",
  "UUUUWWWW",
  "UUWWWWWW",
  "WWWWWWWW",
  "WWWWWWWW",
  "WWWWWWWW",
  "WWWWWWWW",
  "WWWWWWWW",
];

// Row 2 (Bottom):
const FRONT_BOT_LEFT = [
  "WWWWWWWW",
  "WWWWWWWW",
  "WWWWWWWW",
  "WWWWWWWW",
  "KKKKKKKK",
  "KKKKKKKK",
  "KKKKKKKK",
  "KKKKKKKK",
];

const FRONT_BOT_MID = [
  "UUUUUUUU",
  "UUUUUUUU",
  "WWWWWWWW",
  "WWWWWWWW",
  "WWWWWWWW",
  "WWWWWWWW",
  "UUUUUUUU",
  "UUUUUUUU",
];

const FRONT_BOT_RIGHT = [
  "WWUUUUUU",
  "WWUUUUUU",
  "WWWWWWWW",
  "WWWWWWWW",
  "WWWWWWWW",
  "WWWWWWWW",
  "WWWWWWWW",
  "WWWWWWWW",
];

// -----------------------------------------------------------------------------
// TOP FACE (+Y): White, Black, Yellow & Blue with Eyes and Geometry
// -----------------------------------------------------------------------------
const TOP_CENTER_EYES = [
  "WWWWWWWW",
  "WWWWWWWW",
  "WWKWWKWW",
  "WWKWWKWW",
  "WWWWWWWW",
  "KKKKKKKK",
  "WWWWWWWW",
  "WWWWWWWW",
];

const TOP_BOX_GLYPH = [
  "UUUUUUUU",
  "UWWWWWWU",
  "UWUUUUWU",
  "UWUUUUWU",
  "UWUUUUWU",
  "UWWWWWWU",
  "UUUUUUUU",
  "UUUUUUUU",
];

const TOP_YELLOW_CORNER = [
  "LLLLLLLL",
  "LLLKKKKK",
  "LLKKKKKK",
  "LKKKKKKK",
  "KKKKKKKK",
  "KKKKKKKK",
  "KKKKKKKK",
  "KKKKKKKK",
];

const TOP_BLACK_NOTCH = [
  "KKKKKKKK",
  "KKKKKKKK",
  "KKWWWWKK",
  "KKWWWWKK",
  "KKKKKKKK",
  "KKKKKKKK",
  "KKKKKKKK",
  "KKKKKKKK",
];

// -----------------------------------------------------------------------------
// LEFT FACE (-X): White base with Black Pixel Plus (+) and stairs
// -----------------------------------------------------------------------------
const LEFT_PLUS = [
  "WWWWWWWW",
  "WWWKKWWW",
  "WWWKKWWW",
  "WKKKKKKW",
  "WKKKKKKW",
  "WWWKKWWW",
  "WWWKKWWW",
  "WWWWWWWW",
];

const LEFT_STAIRS = [
  "KKWWWWWW",
  "KKWWWWWW",
  "KKKKWWWW",
  "KKKKWWWW",
  "KKKKKKWW",
  "KKKKKKWW",
  "KKKKKKKK",
  "KKKKKKKK",
];

const LEFT_CORNER = [
  "KKKKKKKK",
  "KKKKKKKK",
  "KKKKWWWW",
  "KKKKWWWW",
  "KKWWWWWW",
  "KKWWWWWW",
  "WWWWWWWW",
  "WWWWWWWW",
];

const textureCache = new Map();

function generateTileTexture(faceName, u, v) {
  if (faceName === 'right') {
    // 3x3 crop from the 24x24 yellow/black master grid
    const startR = v * 8;
    const startC = u * 8;
    const tileGrid = [];
    for (let r = 0; r < 8; r++) {
      let rowStr = '';
      for (let c = 0; c < 8; c++) {
        rowStr += RIGHT_FACE_GRID_24x24[startR + r][startC + c];
      }
      tileGrid.push(rowStr);
    }
    return createPixelTexture(tileGrid);
  }

  if (faceName === 'front') {
    const frontMap = [
      [FRONT_TOP_LEFT, FRONT_TOP_MID, FRONT_TOP_RIGHT],
      [FRONT_MID_LEFT, FRONT_MID_MID, FRONT_MID_RIGHT],
      [FRONT_BOT_LEFT, FRONT_BOT_MID, FRONT_BOT_RIGHT],
    ];
    const grid = frontMap[v][u];
    return createPixelTexture(grid);
  }

  if (faceName === 'top') {
    if (u === 1 && v === 1) {
      return createPixelTexture(TOP_CENTER_EYES);
    }
    if (u === 2 && v === 1) {
      return createPixelTexture(TOP_BOX_GLYPH);
    }
    if (u === 0 && v === 0) {
      return createPixelTexture(TOP_YELLOW_CORNER);
    }
    if (u === 1 && v === 0) {
      return createPixelTexture(TOP_BLACK_NOTCH);
    }
    if (u === 2) {
      const solidGrid = Array(8).fill("UUUUUUUU");
      return createPixelTexture(solidGrid);
    }
    if (v === 2) {
      const solidGrid = Array(8).fill(u === 0 ? "KKKKKKKK" : "KKKKKKKK");
      return createPixelTexture(solidGrid);
    }
    const solidGrid = Array(8).fill("WWWWWWWW");
    return createPixelTexture(solidGrid);
  }

  if (faceName === 'left') {
    if (u === 1 && v === 1) {
      return createPixelTexture(LEFT_PLUS);
    }
    if (v === 0) {
      return createPixelTexture(LEFT_CORNER);
    }
    return createPixelTexture(LEFT_STAIRS);
  }

  // Back Face: Yellow & Black geometric patterns
  if (faceName === 'back') {
    const backGrid = [
      "YYYYYYYY",
      "YYKKKYYY",
      "YKKKKKYY",
      "YKKKKKYY",
      "YYKKKYYY",
      "YYYKYYYY",
      "YYYYYYYY",
      "YYYYYYYY",
    ];
    return createPixelTexture(backGrid);
  }

  // Bottom Face: Blue & White geometric patterns
  const botGrid = [
    "UUUUUUUU",
    "UWWWWWWU",
    "UWUUUUWU",
    "UWUUUUWU",
    "UWUUUUWU",
    "UWWWWWWU",
    "UUUUUUUU",
    "UUUUUUUU",
  ];
  return createPixelTexture(botGrid);
}

export function getTileTexture(faceName, u, v) {
  const cacheKey = `${faceName}_${u}_${v}`;
  if (!textureCache.has(cacheKey)) {
    textureCache.set(cacheKey, generateTileTexture(faceName, u, v));
  }
  return textureCache.get(cacheKey);
}

