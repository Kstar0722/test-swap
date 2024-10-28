export const MAX_FEE_PER_GAS = 100000000000;
export const MAX_PRIORITY_FEE_PER_GAS = 100000000000;

export const ERC20_ABI = [
  // Read-Only Functions
  'function allowance(address owner, address spender) view returns (uint256)',
  'function balanceOf(address owner) view returns (uint256)',
  'function decimals() view returns (uint8)',
  'function symbol() view returns (string)',

  // Authenticated Functions
  'function transfer(address to, uint amount) returns (bool)',
  'function approve(address _spender, uint256 _value) returns (bool)',

  // Events
  'event Transfer(address indexed from, address indexed to, uint amount)',
];
