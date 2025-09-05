const utils = require('../utils.js');

const levelData = [
  null,
    // Уровень 1 → 2
  { 
    price: utils.numstring("100.000.000"), 
    bonus: { 
      balance: 5000000, // 5% от 100M
      premium: false, 
      vip: false,
      bilet: 0,
      busi: false,
      farm: false,
      case10: 0,
      case7: 0,
      case6: 0,
      case4: 0,
      limit: 1,
      rating: 1,
      bitkoin: 0,
      cars: false,
      GB: 0,
      ruds: false,
      donat: 0,
      titan: false,
      topdon: false
    } 
  },

  // Уровень 2 → 3
  { 
    price: utils.numstring("200.000.000"), 
    bonus: { 
      balance: 10000000, // 5% от 200M
      premium: false, 
      vip: false,
      bilet: 0,
      busi: false,
      farm: false,
      case10: 0,
      case7: 0,
      case6: 0,
      case4: 0,
      limit: 1,
      rating: 1,
      bitkoin: 0,
      cars: false,
      GB: 0,
      ruds: false,
      donat: 0,
      titan: false,
      topdon: false
    } 
  },

  // Уровень 3 → 4 (первый билет)
  { 
    price: utils.numstring("300.000.000"), 
    bonus: { 
      balance: 15000000, // 5% от 300M
      premium: false, 
      vip: false,
      bilet: 1,
      busi: false,
      farm: false,
      case10: 0,
      case7: 0,
      case6: 0,
      case4: 0,
      limit: 1,
      rating: 1,
      bitkoin: 0,
      cars: false,
      GB: 0,
      ruds: false,
      donat: 0,
      titan: false,
      topdon: false
    } 
  },

  // Уровень 4 → 5
  { 
    price: utils.numstring("400.000.000"), 
    bonus: { 
      balance: 20000000, // 5% от 400M
      premium: false, 
      vip: false,
      bilet: 1,
      busi: false,
      farm: false,
      case10: 0,
      case7: 0,
      case6: 0,
      case4: 0,
      limit: 1,
      rating: 1,
      bitkoin: 0,
      cars: false,
      GB: 0,
      ruds: false,
      donat: 0,
      titan: false,
      topdon: false
    } 
  },

  // Уровень 5 → 6
  { 
    price: utils.numstring("500.000.000"), 
    bonus: { 
      balance: 25000000, // 5% от 500M
      premium: false, 
      vip: false,
      bilet: 1,
      busi: false,
      farm: false,
      case10: 0,
      case7: 0,
      case6: 0,
      case4: 0,
      limit: 1,
      rating: 1,
      bitkoin: 0,
      cars: false,
      GB: 0,
      ruds: false,
      donat: 0,
      titan: false,
      topdon: false
    } 
  },

  // Уровень 6 → 7 (второй билет)
  { 
    price: utils.numstring("600.000.000"), 
    bonus: { 
      balance: 30000000, // 5% от 600M
      premium: false, 
      vip: false,
      bilet: 2,
      busi: false,
      farm: false,
      case10: 0,
      case7: 0,
      case6: 0,
      case4: 0,
      limit: 1,
      rating: 1,
      bitkoin: 0,
      cars: false,
      GB: 0,
      ruds: false,
      donat: 0,
      titan: false,
      topdon: false
    } 
  },

  // Уровень 7 → 8
  { 
    price: utils.numstring("700.000.000"), 
    bonus: { 
      balance: 35000000, // 5% от 700M
      premium: false, 
      vip: false,
      bilet: 2,
      busi: false,
      farm: false,
      case10: 0,
      case7: 0,
      case6: 0,
      case4: 0,
      limit: 1,
      rating: 1,
      bitkoin: 0,
      cars: false,
      GB: 0,
      ruds: false,
      donat: 0,
      titan: false,
      topdon: false
    } 
  },

  // Уровень 8 → 9 (открывается VIP)
  { 
    price: utils.numstring("800.000.000"), 
    bonus: { 
      balance: 40000000, // 5% от 800M
      premium: false, 
      vip: true, // VIP с 8 уровня
      bilet: 2,
      busi: false,
      farm: false,
      case10: 0,
      case7: 0,
      case6: 0,
      case4: 0,
      limit: 1,
      rating: 1,
      bitkoin: 0,
      cars: false,
      GB: 0,
      ruds: false,
      donat: 0,
      titan: false,
      topdon: false
    } 
  },

  // Уровень 9 → 10
  { 
    price: utils.numstring("900.000.000"), 
    bonus: { 
      balance: 45000000, // 5% от 900M
      premium: false, 
      vip: true,
      bilet: 3,
      busi: false,
      farm: false,
      case10: 0,
      case7: 0,
      case6: 0,
      case4: 0,
      limit: 1,
      rating: 1,
      bitkoin: 0,
      cars: false,
      GB: 0,
      ruds: false,
      donat: 0,
      titan: false,
      topdon: false
    } 
  },

  // Уровень 10 → 11
  { 
    price: utils.numstring("1.000.000.000"), 
    bonus: { 
      balance: 50000000, // 5% от 1B
      premium: false, 
      vip: true,
      bilet: 3,
      busi: false,
      farm: false,
      case10: 1, // Первый case10
      case7: 0,
      case6: 0,
      case4: 0,
      limit: 1,
      rating: 1,
      bitkoin: 0,
      cars: false,
      GB: 0,
      ruds: false,
      donat: 0,
      titan: false,
      topdon: false
    } 
  },

  // Уровень 11 → 12
  { 
    price: utils.numstring("1.100.000.000"), 
    bonus: { 
      balance: 55000000, // 5% от 1.1B
      premium: false, 
      vip: true,
      bilet: 3,
      busi: false,
      farm: false,
      case10: 1,
      case7: 0,
      case6: 0,
      case4: 0,
      limit: 1,
      rating: 1,
      bitkoin: 0,
      cars: false,
      GB: 0,
      ruds: false,
      donat: 0,
      titan: false,
      topdon: false
    } 
  },

  // Уровень 12 → 13
  { 
    price: utils.numstring("1.200.000.000"), 
    bonus: { 
      balance: 60000000, // 5% от 1.2B
      premium: false, 
      vip: true,
      bilet: 4,
      busi: false,
      farm: false,
      case10: 1,
      case7: 0,
      case6: 0,
      case4: 0,
      limit: 1,
      rating: 1,
      bitkoin: 0,
      cars: false,
      GB: 0,
      ruds: false,
      donat: 0,
      titan: false,
      topdon: false
    } 
  },

  // Уровень 13 → 14
  { 
    price: utils.numstring("1.300.000.000"), 
    bonus: { 
      balance: 65000000, // 5% от 1.3B
      premium: false, 
      vip: true,
      bilet: 4,
      busi: false,
      farm: false,
      case10: 1,
      case7: 0,
      case6: 0,
      case4: 0,
      limit: 1,
      rating: 1,
      bitkoin: 0,
      cars: false,
      GB: 0,
      ruds: false,
      donat: 0,
      titan: false,
      topdon: false
    } 
  },

  // Уровень 14 → 15
  { 
    price: utils.numstring("1.400.000.000"), 
    bonus: { 
      balance: 70000000, // 5% от 1.4B
      premium: false, 
      vip: true,
      bilet: 4,
      busi: false,
      farm: false,
      case10: 1,
      case7: 0,
      case6: 0,
      case4: 0,
      limit: 1,
      rating: 1,
      bitkoin: 0,
      cars: false,
      GB: 0,
      ruds: false,
      donat: 0,
      titan: false,
      topdon: false
    } 
  },

  // Уровень 15 → 16 (открывается busi)
  { 
    price: utils.numstring("1.500.000.000"), 
    bonus: { 
      balance: 75000000, // 5% от 1.5B
      premium: false, 
      vip: true,
      bilet: 5,
      busi: true, // Бизнес с 15 уровня
      farm: false,
      case10: 1,
      case7: 0,
      case6: 0,
      case4: 0,
      limit: 1,
      rating: 1,
      bitkoin: 0,
      cars: false,
      GB: 0,
      ruds: false,
      donat: 0,
      titan: false,
      topdon: false
    } 
  },

  // Уровень 16 → 17
  { 
    price: utils.numstring("1.600.000.000"), 
    bonus: { 
      balance: 80000000, // 5% от 1.6B
      premium: false, 
      vip: true,
      bilet: 5,
      busi: true,
      farm: false,
      case10: 1,
      case7: 0,
      case6: 0,
      case4: 0,
      limit: 1,
      rating: 1,
      bitkoin: 0,
      cars: false,
      GB: 0,
      ruds: false,
      donat: 0,
      titan: false,
      topdon: false
    } 
  },

  // Уровень 17 → 18
  { 
    price: utils.numstring("1.700.000.000"), 
    bonus: { 
      balance: 85000000, // 5% от 1.7B
      premium: false, 
      vip: true,
      bilet: 5,
      busi: true,
      farm: false,
      case10: 1,
      case7: 0,
      case6: 0,
      case4: 0,
      limit: 1,
      rating: 1,
      bitkoin: 0,
      cars: false,
      GB: 0,
      ruds: false,
      donat: 0,
      titan: false,
      topdon: false
    } 
  },

  // Уровень 18 → 19
  { 
    price: utils.numstring("1.800.000.000"), 
    bonus: { 
      balance: 90000000, // 5% от 1.8B
      premium: false, 
      vip: true,
      bilet: 6,
      busi: true,
      farm: false,
      case10: 1,
      case7: 0,
      case6: 0,
      case4: 0,
      limit: 1,
      rating: 1,
      bitkoin: 0,
      cars: false,
      GB: 0,
      ruds: false,
      donat: 0,
      titan: false,
      topdon: false
    } 
  },

  // Уровень 19 → 20
  { 
    price: utils.numstring("1.900.000.000"), 
    bonus: { 
      balance: 95000000, // 5% от 1.9B
      premium: false, 
      vip: true,
      bilet: 6,
      busi: true,
      farm: false,
      case10: 1,
      case7: 0,
      case6: 0,
      case4: 0,
      limit: 1,
      rating: 1,
      bitkoin: 0,
      cars: false,
      GB: 0,
      ruds: false,
      donat: 0,
      titan: false,
      topdon: false
    } 
  },

  // Уровень 20 → 21
  { 
    price: utils.numstring("2.000.000.000"), 
    bonus: { 
      balance: 100000000, // 5% от 2B
      premium: false, 
      vip: true,
      bilet: 6,
      busi: true,
      farm: false,
      case10: 1,
      case7: 1, // Первый case7
      case6: 0,
      case4: 0,
      limit: 1,
      rating: 1,
      bitkoin: 0,
      cars: false,
      GB: 0,
      ruds: false,
      donat: 0,
      titan: false,
      topdon: false
    } 
  },
    // Уровень 21 → 22
  { 
    price: utils.numstring("2.100.000.000"), 
    bonus: { 
      balance: 105000000, // 5% от 2.1B
      premium: false, 
      vip: true,
      bilet: 6,
      busi: true,
      farm: false,
      case10: 1,
      case7: 1,
      case6: 0,
      case4: 0,
      limit: 1,
      rating: 1,
      bitkoin: 0,
      cars: false,
      GB: 0,
      ruds: false,
      donat: 0,
      titan: false,
      topdon: false
    } 
  },

  // Уровень 22 → 23 (первый case6)
  { 
    price: utils.numstring("2.200.000.000"), 
    bonus: { 
      balance: 110000000,
      premium: false, 
      vip: true,
      bilet: 7,
      busi: true,
      farm: false,
      case10: 1,
      case7: 1,
      case6: 1,
      case4: 0,
      limit: 1,
      rating: 1,
      bitkoin: 0,
      cars: false,
      GB: 0,
      ruds: false,
      donat: 0,
      titan: false,
      topdon: false
    } 
  },

  // Уровень 23 → 24
  { 
    price: utils.numstring("2.300.000.000"), 
    bonus: { 
      balance: 115000000,
      premium: false, 
      vip: true,
      bilet: 7,
      busi: true,
      farm: false,
      case10: 1,
      case7: 1,
      case6: 1,
      case4: 0,
      limit: 1,
      rating: 1,
      bitkoin: 0,
      cars: false,
      GB: 0,
      ruds: false,
      donat: 0,
      titan: false,
      topdon: false
    } 
  },

  // Уровень 24 → 25 (открывается farm)
  { 
    price: utils.numstring("2.400.000.000"), 
    bonus: { 
      balance: 120000000,
      premium: false, 
      vip: true,
      bilet: 8,
      busi: true,
      farm: true, // Ферма с 24 уровня
      case10: 1,
      case7: 1,
      case6: 1,
      case4: 0,
      limit: 1,
      rating: 1,
      bitkoin: 0,
      cars: false,
      GB: 0,
      ruds: false,
      donat: 0,
      titan: false,
      topdon: false
    } 
  },

  // Уровень 25 → 26
  { 
    price: utils.numstring("2.500.000.000"), 
    bonus: { 
      balance: 125000000,
      premium: false, 
      vip: true,
      bilet: 8,
      busi: true,
      farm: true,
      case10: 1,
      case7: 1,
      case6: 1,
      case4: 0,
      limit: 1,
      rating: 1,
      bitkoin: 1, // Первый биткоин
      cars: false,
      GB: 0,
      ruds: false,
      donat: 0,
      titan: false,
      topdon: false
    } 
  },

  // Уровень 26 → 27
  { 
    price: utils.numstring("2.600.000.000"), 
    bonus: { 
      balance: 130000000,
      premium: false, 
      vip: true,
      bilet: 8,
      busi: true,
      farm: true,
      case10: 1,
      case7: 1,
      case6: 1,
      case4: 0,
      limit: 1,
      rating: 1,
      bitkoin: 1,
      cars: false,
      GB: 0,
      ruds: false,
      donat: 0,
      titan: false,
      topdon: false
    } 
  },

  // Уровень 27 → 28 (первый case4)
  { 
    price: utils.numstring("2.700.000.000"), 
    bonus: { 
      balance: 135000000,
      premium: false, 
      vip: true,
      bilet: 9,
      busi: true,
      farm: true,
      case10: 1,
      case7: 1,
      case6: 1,
      case4: 1,
      limit: 1,
      rating: 1,
      bitkoin: 1,
      cars: false,
      GB: 0,
      ruds: false,
      donat: 0,
      titan: false,
      topdon: false
    } 
  },

  // Уровень 28 → 29 (открывается cars)
  { 
    price: utils.numstring("2.800.000.000"), 
    bonus: { 
      balance: 140000000,
      premium: false, 
      vip: true,
      bilet: 9,
      busi: true,
      farm: true,
      case10: 1,
      case7: 1,
      case6: 1,
      case4: 1,
      limit: 1,
      rating: 1,
      bitkoin: 1,
      cars: true, // Авто с 28 уровня
      GB: 0,
      ruds: false,
      donat: 0,
      titan: false,
      topdon: false
    } 
  },

  // Уровень 29 → 30
  { 
    price: utils.numstring("2.900.000.000"), 
    bonus: { 
      balance: 145000000,
      premium: false, 
      vip: true,
      bilet: 10,
      busi: true,
      farm: true,
      case10: 1,
      case7: 1,
      case6: 1,
      case4: 1,
      limit: 1,
      rating: 1,
      bitkoin: 1,
      cars: true,
      GB: 1, // Первый GB
      ruds: false,
      donat: 0,
      titan: false,
      topdon: false
    } 
  },

  // Уровень 30 → 31 (открывается ruds)
  { 
    price: utils.numstring("3.000.000.000"), 
    bonus: { 
      balance: 150000000,
      premium: false, 
      vip: true,
      bilet: 10,
      busi: true,
      farm: true,
      case10: 1,
      case7: 1,
      case6: 1,
      case4: 1,
      limit: 1,
      rating: 1,
      bitkoin: 1,
      cars: true,
      GB: 1,
      ruds: true, // Руда с 30 уровня
      donat: 0,
      titan: false,
      topdon: false
    } 
  },

  // Уровень 31 → 32 (открывается Premium)
  { 
    price: utils.numstring("3.100.000.000"), 
    bonus: { 
      balance: 155000000,
      premium: true, // Premium с 31 уровня
      vip: true,
      bilet: 10,
      busi: true,
      farm: true,
      case10: 1,
      case7: 1,
      case6: 1,
      case4: 1,
      limit: 1,
      rating: 1,
      bitkoin: 1,
      cars: true,
      GB: 1,
      ruds: true,
      donat: 0,
      titan: false,
      topdon: false
    } 
  },

  // Уровень 32 → 33
  { 
    price: utils.numstring("3.200.000.000"), 
    bonus: { 
      balance: 160000000,
      premium: true,
      vip: true,
      bilet: 11,
      busi: true,
      farm: true,
      case10: 1,
      case7: 1,
      case6: 1,
      case4: 1,
      limit: 1,
      rating: 1,
      bitkoin: 1,
      cars: true,
      GB: 1,
      ruds: true,
      donat: 0,
      titan: false,
      topdon: false
    } 
  },

  // Уровень 33 → 34
  { 
    price: utils.numstring("3.300.000.000"), 
    bonus: { 
      balance: 165000000,
      premium: true,
      vip: true,
      bilet: 11,
      busi: true,
      farm: true,
      case10: 1,
      case7: 1,
      case6: 1,
      case4: 1,
      limit: 1,
      rating: 1,
      bitkoin: 1,
      cars: true,
      GB: 1,
      ruds: true,
      donat: 0,
      titan: false,
      topdon: false
    } 
  },

  // Уровень 34 → 35 (открывается titan)
  { 
    price: utils.numstring("3.400.000.000"), 
    bonus: { 
      balance: 170000000,
      premium: true,
      vip: true,
      bilet: 12,
      busi: true,
      farm: true,
      case10: 1,
      case7: 1,
      case6: 1,
      case4: 1,
      limit: 1,
      rating: 1,
      bitkoin: 1,
      cars: true,
      GB: 1,
      ruds: true,
      donat: 0,
      titan: true, // Титан с 34 уровня
      topdon: false
    } 
  },

  // Уровень 35 → 36
  { 
    price: utils.numstring("3.500.000.000"), 
    bonus: { 
      balance: 175000000,
      premium: true,
      vip: true,
      bilet: 12,
      busi: true,
      farm: true,
      case10: 1,
      case7: 1,
      case6: 1,
      case4: 1,
      limit: 1,
      rating: 1,
      bitkoin: 1,
      cars: true,
      GB: 1,
      ruds: true,
      donat: 0,
      titan: true,
      topdon: false
    } 
  },

  // Уровень 36 → 37
  { 
    price: utils.numstring("3.600.000.000"), 
    bonus: { 
      balance: 180000000,
      premium: true,
      vip: true,
      bilet: 12,
      busi: true,
      farm: true,
      case10: 1,
      case7: 1,
      case6: 1,
      case4: 1,
      limit: 1,
      rating: 1,
      bitkoin: 1,
      cars: true,
      GB: 1,
      ruds: true,
      donat: 0,
      titan: true,
      topdon: false
    } 
  },

  // Уровень 37 → 38 (открывается topdon)
  { 
    price: utils.numstring("3.700.000.000"), 
    bonus: { 
      balance: 185000000,
      premium: true,
      vip: true,
      bilet: 13,
      busi: true,
      farm: true,
      case10: 1,
      case7: 1,
      case6: 1,
      case4: 1,
      limit: 1,
      rating: 1,
      bitkoin: 1,
      cars: true,
      GB: 1,
      ruds: true,
      donat: 0,
      titan: true,
      topdon: true // Top Don с 37 уровня
    } 
  },

  // Уровень 38 → 39
  { 
    price: utils.numstring("3.800.000.000"), 
    bonus: { 
      balance: 190000000,
      premium: true,
      vip: true,
      bilet: 13,
      busi: true,
      farm: true,
      case10: 1,
      case7: 1,
      case6: 1,
      case4: 1,
      limit: 1,
      rating: 1,
      bitkoin: 1,
      cars: true,
      GB: 1,
      ruds: true,
      donat: 0,
      titan: true,
      topdon: true
    } 
  },

  // Уровень 39 → 40 (финальный уровень)
  { 
    price: utils.numstring("3.900.000.000"), 
    bonus: { 
      balance: 195000000,
      premium: true,
      vip: true,
      bilet: 15, // Удвоенные билеты
      busi: true,
      farm: true,
      case10: 2, // Удвоенные кейсы
      case7: 2,
      case6: 2,
      case4: 2,
      limit: 1,
      rating: 1,
      bitkoin: 1,
      cars: true,
      GB: 1,
      ruds: true,
      donat: 0,
      titan: true,
      topdon: true
    } 
  },
    // Уровень 40 → 41
  { 
    price: utils.numstring("4.000.000.000"), 
    bonus: { 
      balance: 200000000,
      premium: true,
      vip: true,
      bilet: 15,
      busi: true,
      farm: true,
      case10: 2,
      case7: 2,
      case6: 2,
      case4: 2,
      limit: 1,
      rating: 1,
      bitkoin: 1,
      cars: true,
      GB: 1,
      ruds: true,
      donat: 1,
      titan: true,
      topdon: true
    } 
  },

  // Уровень 41 → 42
  { 
    price: utils.numstring("4.200.000.000"), 
    bonus: { 
      balance: 210000000,
      premium: true,
      vip: true,
      bilet: 15,
      busi: true,
      farm: true,
      case10: 2,
      case7: 2,
      case6: 2,
      case4: 2,
      limit: 1,
      rating: 1,
      bitkoin: 1,
      cars: true,
      GB: 1,
      ruds: true,
      donat: 1,
      titan: true,
      topdon: true
    } 
  },

  // Уровень 42 → 43
  { 
    price: utils.numstring("4.400.000.000"), 
    bonus: { 
      balance: 220000000,
      premium: true,
      vip: true,
      bilet: 16,
      busi: true,
      farm: true,
      case10: 2,
      case7: 2,
      case6: 2,
      case4: 2,
      limit: 1,
      rating: 1,
      bitkoin: 1,
      cars: true,
      GB: 2,
      ruds: true,
      donat: 1,
      titan: true,
      topdon: true
    } 
  },

  // Уровень 43 → 44
  { 
    price: utils.numstring("4.600.000.000"), 
    bonus: { 
      balance: 230000000,
      premium: true,
      vip: true,
      bilet: 16,
      busi: true,
      farm: true,
      case10: 2,
      case7: 2,
      case6: 2,
      case4: 2,
      limit: 1,
      rating: 1,
      bitkoin: 1,
      cars: true,
      GB: 2,
      ruds: true,
      donat: 1,
      titan: true,
      topdon: true
    } 
  },

  // Уровень 44 → 45
  { 
    price: utils.numstring("4.800.000.000"), 
    bonus: { 
      balance: 240000000,
      premium: true,
      vip: true,
      bilet: 17,
      busi: true,
      farm: true,
      case10: 2,
      case7: 2,
      case6: 2,
      case4: 2,
      limit: 1,
      rating: 1,
      bitkoin: 2,
      cars: true,
      GB: 2,
      ruds: true,
      donat: 1,
      titan: true,
      topdon: true
    } 
  },

  // Уровень 45 → 46
  { 
    price: utils.numstring("5.000.000.000"), 
    bonus: { 
      balance: 250000000,
      premium: true,
      vip: true,
      bilet: 17,
      busi: true,
      farm: true,
      case10: 2,
      case7: 2,
      case6: 2,
      case4: 2,
      limit: 1,
      rating: 1,
      bitkoin: 2,
      cars: true,
      GB: 2,
      ruds: true,
      donat: 1,
      titan: true,
      topdon: true
    } 
  },

  // Уровень 46 → 47
  { 
    price: utils.numstring("5.200.000.000"), 
    bonus: { 
      balance: 260000000,
      premium: true,
      vip: true,
      bilet: 18,
      busi: true,
      farm: true,
      case10: 2,
      case7: 2,
      case6: 2,
      case4: 2,
      limit: 1,
      rating: 1,
      bitkoin: 2,
      cars: true,
      GB: 2,
      ruds: true,
      donat: 1,
      titan: true,
      topdon: true
    } 
  },

  // Уровень 47 → 48
  { 
    price: utils.numstring("5.400.000.000"), 
    bonus: { 
      balance: 270000000,
      premium: true,
      vip: true,
      bilet: 18,
      busi: true,
      farm: true,
      case10: 2,
      case7: 2,
      case6: 2,
      case4: 2,
      limit: 1,
      rating: 1,
      bitkoin: 2,
      cars: true,
      GB: 2,
      ruds: true,
      donat: 1,
      titan: true,
      topdon: true
    } 
  },

  // Уровень 48 → 49
  { 
    price: utils.numstring("5.600.000.000"), 
    bonus: { 
      balance: 280000000,
      premium: true,
      vip: true,
      bilet: 19,
      busi: true,
      farm: true,
      case10: 2,
      case7: 2,
      case6: 2,
      case4: 2,
      limit: 1,
      rating: 1,
      bitkoin: 2,
      cars: true,
      GB: 2,
      ruds: true,
      donat: 1,
      titan: true,
      topdon: true
    } 
  },

  // Уровень 49 → 50
  { 
    price: utils.numstring("5.800.000.000"), 
    bonus: { 
      balance: 290000000,
      premium: true,
      vip: true,
      bilet: 19,
      busi: true,
      farm: true,
      case10: 2,
      case7: 2,
      case6: 2,
      case4: 2,
      limit: 1,
      rating: 1,
      bitkoin: 2,
      cars: true,
      GB: 2,
      ruds: true,
      donat: 1,
      titan: true,
      topdon: true
    } 
  },

  // Уровень 50 → 51
  { 
    price: utils.numstring("6.000.000.000"), 
    bonus: { 
      balance: 300000000,
      premium: true,
      vip: true,
      bilet: 20,
      busi: true,
      farm: true,
      case10: 3,
      case7: 3,
      case6: 3,
      case4: 3,
      limit: 2,
      rating: 2,
      bitkoin: 3,
      cars: true,
      GB: 3,
      ruds: true,
      donat: 2,
      titan: true,
      topdon: true
    } 
  },

  // Уровень 51 → 52
  { 
    price: utils.numstring("6.500.000.000"), 
    bonus: { 
      balance: 325000000,
      premium: true,
      vip: true,
      bilet: 20,
      busi: true,
      farm: true,
      case10: 3,
      case7: 3,
      case6: 3,
      case4: 3,
      limit: 2,
      rating: 2,
      bitkoin: 3,
      cars: true,
      GB: 3,
      ruds: true,
      donat: 2,
      titan: true,
      topdon: true
    } 
  },

  // Уровень 52 → 53
  { 
    price: utils.numstring("7.000.000.000"), 
    bonus: { 
      balance: 350000000,
      premium: true,
      vip: true,
      bilet: 21,
      busi: true,
      farm: true,
      case10: 3,
      case7: 3,
      case6: 3,
      case4: 3,
      limit: 2,
      rating: 2,
      bitkoin: 3,
      cars: true,
      GB: 3,
      ruds: true,
      donat: 2,
      titan: true,
      topdon: true
    } 
  },

  // Уровень 53 → 54
  { 
    price: utils.numstring("7.500.000.000"), 
    bonus: { 
      balance: 375000000,
      premium: true,
      vip: true,
      bilet: 21,
      busi: true,
      farm: true,
      case10: 3,
      case7: 3,
      case6: 3,
      case4: 3,
      limit: 2,
      rating: 2,
      bitkoin: 3,
      cars: true,
      GB: 3,
      ruds: true,
      donat: 2,
      titan: true,
      topdon: true
    } 
  },

  // Уровень 54 → 55
  { 
    price: utils.numstring("8.000.000.000"), 
    bonus: { 
      balance: 400000000,
      premium: true,
      vip: true,
      bilet: 22,
      busi: true,
      farm: true,
      case10: 3,
      case7: 3,
      case6: 3,
      case4: 3,
      limit: 2,
      rating: 2,
      bitkoin: 4,
      cars: true,
      GB: 4,
      ruds: true,
      donat: 2,
      titan: true,
      topdon: true
    } 
  },

  // Уровень 55 → 56
  { 
    price: utils.numstring("8.500.000.000"), 
    bonus: { 
      balance: 425000000,
      premium: true,
      vip: true,
      bilet: 22,
      busi: true,
      farm: true,
      case10: 3,
      case7: 3,
      case6: 3,
      case4: 3,
      limit: 2,
      rating: 2,
      bitkoin: 4,
      cars: true,
      GB: 4,
      ruds: true,
      donat: 2,
      titan: true,
      topdon: true
    } 
  },

  // Уровень 56 → 57
  { 
    price: utils.numstring("9.000.000.000"), 
    bonus: { 
      balance: 450000000,
      premium: true,
      vip: true,
      bilet: 23,
      busi: true,
      farm: true,
      case10: 3,
      case7: 3,
      case6: 3,
      case4: 3,
      limit: 2,
      rating: 2,
      bitkoin: 4,
      cars: true,
      GB: 4,
      ruds: true,
      donat: 2,
      titan: true,
      topdon: true
    } 
  },

  // Уровень 57 → 58
  { 
    price: utils.numstring("9.500.000.000"), 
    bonus: { 
      balance: 475000000,
      premium: true,
      vip: true,
      bilet: 23,
      busi: true,
      farm: true,
      case10: 3,
      case7: 3,
      case6: 3,
      case4: 3,
      limit: 2,
      rating: 2,
      bitkoin: 4,
      cars: true,
      GB: 4,
      ruds: true,
      donat: 2,
      titan: true,
      topdon: true
    } 
  },

  // Уровень 58 → 59
  { 
    price: utils.numstring("10.000.000.000"), 
    bonus: { 
      balance: 500000000,
      premium: true,
      vip: true,
      bilet: 24,
      busi: true,
      farm: true,
      case10: 3,
      case7: 3,
      case6: 3,
      case4: 3,
      limit: 2,
      rating: 2,
      bitkoin: 4,
      cars: true,
      GB: 4,
      ruds: true,
      donat: 2,
      titan: true,
      topdon: true
    } 
  },

  // Уровень 59 → 60
  { 
    price: utils.numstring("10.500.000.000"), 
    bonus: { 
      balance: 525000000,
      premium: true,
      vip: true,
      bilet: 24,
      busi: true,
      farm: true,
      case10: 3,
      case7: 3,
      case6: 3,
      case4: 3,
      limit: 2,
      rating: 2,
      bitkoin: 4,
      cars: true,
      GB: 4,
      ruds: true,
      donat: 2,
      titan: true,
      topdon: true
    } 
  },

  // Уровень 60 → 61
  { 
    price: utils.numstring("11.000.000.000"), 
    bonus: { 
      balance: 550000000,
      premium: true,
      vip: true,
      bilet: 25,
      busi: true,
      farm: true,
      case10: 4,
      case7: 4,
      case6: 4,
      case4: 4,
      limit: 3,
      rating: 3,
      bitkoin: 5,
      cars: true,
      GB: 5,
      ruds: true,
      donat: 3,
      titan: true,
      topdon: true
    } 
  },

  // Уровень 61 → 62
  { 
    price: utils.numstring("12.000.000.000"), 
    bonus: { 
      balance: 600000000,
      premium: true,
      vip: true,
      bilet: 25,
      busi: true,
      farm: true,
      case10: 4,
      case7: 4,
      case6: 4,
      case4: 4,
      limit: 3,
      rating: 3,
      bitkoin: 5,
      cars: true,
      GB: 5,
      ruds: true,
      donat: 3,
      titan: true,
      topdon: true
    } 
  },

  // Уровень 62 → 63
  { 
    price: utils.numstring("13.000.000.000"), 
    bonus: { 
      balance: 650000000,
      premium: true,
      vip: true,
      bilet: 26,
      busi: true,
      farm: true,
      case10: 4,
      case7: 4,
      case6: 4,
      case4: 4,
      limit: 3,
      rating: 3,
      bitkoin: 5,
      cars: true,
      GB: 5,
      ruds: true,
      donat: 3,
      titan: true,
      topdon: true
    } 
  },

  // Уровень 63 → 64
  { 
    price: utils.numstring("14.000.000.000"), 
    bonus: { 
      balance: 700000000,
      premium: true,
      vip: true,
      bilet: 26,
      busi: true,
      farm: true,
      case10: 4,
      case7: 4,
      case6: 4,
      case4: 4,
      limit: 3,
      rating: 3,
      bitkoin: 5,
      cars: true,
      GB: 5,
      ruds: true,
      donat: 3,
      titan: true,
      topdon: true
    } 
  },

  // Уровень 64 → 65
  { 
    price: utils.numstring("15.000.000.000"), 
    bonus: { 
      balance: 750000000,
      premium: true,
      vip: true,
      bilet: 27,
      busi: true,
      farm: true,
      case10: 4,
      case7: 4,
      case6: 4,
      case4: 4,
      limit: 3,
      rating: 3,
      bitkoin: 6,
      cars: true,
      GB: 6,
      ruds: true,
      donat: 3,
      titan: true,
      topdon: true
    } 
  },

  // Уровень 65 → 66
  { 
    price: utils.numstring("16.000.000.000"), 
    bonus: { 
      balance: 800000000,
      premium: true,
      vip: true,
      bilet: 27,
      busi: true,
      farm: true,
      case10: 4,
      case7: 4,
      case6: 4,
      case4: 4,
      limit: 3,
      rating: 3,
      bitkoin: 6,
      cars: true,
      GB: 6,
      ruds: true,
      donat: 3,
      titan: true,
      topdon: true
    } 
  },

  // Уровень 66 → 67
  { 
    price: utils.numstring("17.000.000.000"), 
    bonus: { 
      balance: 850000000,
      premium: true,
      vip: true,
      bilet: 28,
      busi: true,
      farm: true,
      case10: 4,
      case7: 4,
      case6: 4,
      case4: 4,
      limit: 3,
      rating: 3,
      bitkoin: 6,
      cars: true,
      GB: 6,
      ruds: true,
      donat: 3,
      titan: true,
      topdon: true
    } 
  },

  // Уровень 67 → 68
  { 
    price: utils.numstring("18.000.000.000"), 
    bonus: { 
      balance: 900000000,
      premium: true,
      vip: true,
      bilet: 28,
      busi: true,
      farm: true,
      case10: 4,
      case7: 4,
      case6: 4,
      case4: 4,
      limit: 3,
      rating: 3,
      bitkoin: 6,
      cars: true,
      GB: 6,
      ruds: true,
      donat: 3,
      titan: true,
      topdon: true
    } 
  },

  // Уровень 68 → 69
  { 
    price: utils.numstring("19.000.000.000"), 
    bonus: { 
      balance: 950000000,
      premium: true,
      vip: true,
      bilet: 29,
      busi: true,
      farm: true,
      case10: 4,
      case7: 4,
      case6: 4,
      case4: 4,
      limit: 3,
      rating: 3,
      bitkoin: 6,
      cars: true,
      GB: 6,
      ruds: true,
      donat: 3,
      titan: true,
      topdon: true
    } 
  },

  // Уровень 69 → 70
  { 
    price: utils.numstring("20.000.000.000"), 
    bonus: { 
      balance: 1000000000,
      premium: true,
      vip: true,
      bilet: 30,
      busi: true,
      farm: true,
      case10: 5,
      case7: 5,
      case6: 5,
      case4: 5,
      limit: 5,
      rating: 5,
      bitkoin: 10,
      cars: true,
      GB: 10,
      ruds: true,
      donat: 5,
      titan: true,
      topdon: true
    } 
  },

  // Уровень 70 → 71
  { 
    price: utils.numstring("22.000.000.000"), 
    bonus: { 
      balance: 1100000000,
      premium: true,
      vip: true,
      bilet: 30,
      busi: true,
      farm: true,
      case10: 5,
      case7: 5,
      case6: 5,
      case4: 5,
      limit: 5,
      rating: 5,
      bitkoin: 10,
      cars: true,
      GB: 10,
      ruds: true,
      donat: 5,
      titan: true,
      topdon: true
    } 
  },

  // Уровень 71 → 72
  { 
    price: utils.numstring("24.000.000.000"), 
    bonus: { 
      balance: 1200000000,
      premium: true,
      vip: true,
      bilet: 32,
      busi: true,
      farm: true,
      case10: 5,
      case7: 5,
      case6: 5,
      case4: 5,
      limit: 5,
      rating: 5,
      bitkoin: 10,
      cars: true,
      GB: 10,
      ruds: true,
      donat: 5,
      titan: true,
      topdon: true
    } 
  },

  // Уровень 72 → 73
  { 
    price: utils.numstring("26.000.000.000"), 
    bonus: { 
      balance: 1300000000,
      premium: true,
      vip: true,
      bilet: 32,
      busi: true,
      farm: true,
      case10: 5,
      case7: 5,
      case6: 5,
      case4: 5,
      limit: 5,
      rating: 5,
      bitkoin: 10,
      cars: true,
      GB: 10,
      ruds: true,
      donat: 5,
      titan: true,
      topdon: true
    } 
  },

  // Уровень 73 → 74
  { 
    price: utils.numstring("28.000.000.000"), 
    bonus: { 
      balance: 1400000000,
      premium: true,
      vip: true,
      bilet: 34,
      busi: true,
      farm: true,
      case10: 5,
      case7: 5,
      case6: 5,
      case4: 5,
      limit: 5,
      rating: 5,
      bitkoin: 12,
      cars: true,
      GB: 12,
      ruds: true,
      donat: 5,
      titan: true,
      topdon: true
    } 
  },

  // Уровень 74 → 75
  { 
    price: utils.numstring("30.000.000.000"), 
    bonus: { 
      balance: 1500000000,
      premium: true,
      vip: true,
      bilet: 34,
      busi: true,
      farm: true,
      case10: 5,
      case7: 5,
      case6: 5,
      case4: 5,
      limit: 5,
      rating: 5,
      bitkoin: 12,
      cars: true,
      GB: 12,
      ruds: true,
      donat: 5,
      titan: true,
      topdon: true
    } 
  },

  // Уровень 75 → 76
  { 
    price: utils.numstring("32.000.000.000"), 
    bonus: { 
      balance: 1600000000,
      premium: true,
      vip: true,
      bilet: 36,
      busi: true,
      farm: true,
      case10: 6,
      case7: 6,
      case6: 6,
      case4: 6,
      limit: 6,
      rating: 6,
      bitkoin: 12,
      cars: true,
      GB: 12,
      ruds: true,
      donat: 6,
      titan: true,
      topdon: true
    } 
  },

  // Уровень 76 → 77
  { 
    price: utils.numstring("34.000.000.000"), 
    bonus: { 
      balance: 1700000000,
      premium: true,
      vip: true,
      bilet: 36,
      busi: true,
      farm: true,
      case10: 6,
      case7: 6,
      case6: 6,
      case4: 6,
      limit: 6,
      rating: 6,
      bitkoin: 12,
      cars: true,
      GB: 12,
      ruds: true,
      donat: 6,
      titan: true,
      topdon: true
    } 
  },

  // Уровень 77 → 78
  { 
    price: utils.numstring("36.000.000.000"), 
    bonus: { 
      balance: 1800000000,
      premium: true,
      vip: true,
      bilet: 38,
      busi: true,
      farm: true,
      case10: 6,
      case7: 6,
      case6: 6,
      case4: 6,
      limit: 6,
      rating: 6,
      bitkoin: 12,
      cars: true,
      GB: 12,
      ruds: true,
      donat: 6,
      titan: true,
      topdon: true
    } 
  },

  // Уровень 78 → 79
  { 
    price: utils.numstring("38.000.000.000"), 
    bonus: { 
      balance: 1900000000,
      premium: true,
      vip: true,
      bilet: 38,
      busi: true,
      farm: true,
      case10: 6,
      case7: 6,
      case6: 6,
      case4: 6,
      limit: 6,
      rating: 6,
      bitkoin: 12,
      cars: true,
      GB: 12,
      ruds: true,
      donat: 6,
      titan: true,
      topdon: true
    } 
  },

  // Уровень 79 → 80
  { 
    price: utils.numstring("40.000.000.000"), 
    bonus: { 
      balance: 2000000000,
      premium: true,
      vip: true,
      bilet: 40,
      busi: true,
      farm: true,
      case10: 8,
      case7: 8,
      case6: 8,
      case4: 8,
      limit: 8,
      rating: 8,
      bitkoin: 15,
      cars: true,
      GB: 15,
      ruds: true,
      donat: 8,
      titan: true,
      topdon: true
    } 
  },

  // Уровень 80 → 81
  { 
    price: utils.numstring("45.000.000.000"), 
    bonus: { 
      balance: 2250000000,
      premium: true,
      vip: true,
      bilet: 40,
      busi: true,
      farm: true,
      case10: 8,
      case7: 8,
      case6: 8,
      case4: 8,
      limit: 8,
      rating: 8,
      bitkoin: 15,
      cars: true,
      GB: 15,
      ruds: true,
      donat: 8,
      titan: true,
      topdon: true
    } 
  },

  // Уровень 81 → 82
  { 
    price: utils.numstring("50.000.000.000"), 
    bonus: { 
      balance: 2500000000,
      premium: true,
      vip: true,
      bilet: 42,
      busi: true,
      farm: true,
      case10: 8,
      case7: 8,
      case6: 8,
      case4: 8,
      limit: 8,
      rating: 8,
      bitkoin: 15,
      cars: true,
      GB: 15,
      ruds: true,
      donat: 8,
      titan: true,
      topdon: true
    } 
  },

  // Уровень 82 → 83
  { 
    price: utils.numstring("55.000.000.000"), 
    bonus: { 
      balance: 2750000000,
      premium: true,
      vip: true,
      bilet: 42,
      busi: true,
      farm: true,
      case10: 8,
      case7: 8,
      case6: 8,
      case4: 8,
      limit: 8,
      rating: 8,
      bitkoin: 15,
      cars: true,
      GB: 15,
      ruds: true,
      donat: 8,
      titan: true,
      topdon: true
    } 
  },

  // Уровень 83 → 84
  { 
    price: utils.numstring("60.000.000.000"), 
    bonus: { 
      balance: 3000000000,
      premium: true,
      vip: true,
      bilet: 44,
      busi: true,
      farm: true,
      case10: 8,
      case7: 8,
      case6: 8,
      case4: 8,
      limit: 8,
      rating: 8,
      bitkoin: 18,
      cars: true,
      GB: 18,
      ruds: true,
      donat: 8,
      titan: true,
      topdon: true
    } 
  },

  // Уровень 84 → 85
  { 
    price: utils.numstring("65.000.000.000"), 
    bonus: { 
      balance: 3250000000,
      premium: true,
      vip: true,
      bilet: 44,
      busi: true,
      farm: true,
      case10: 8,
      case7: 8,
      case6: 8,
      case4: 8,
      limit: 8,
      rating: 8,
      bitkoin: 18,
      cars: true,
      GB: 18,
      ruds: true,
      donat: 8,
      titan: true,
      topdon: true
    } 
  },

  // Уровень 85 → 86
  { 
    price: utils.numstring("70.000.000.000"), 
    bonus: { 
      balance: 3500000000,
      premium: true,
      vip: true,
      bilet: 46,
      busi: true,
      farm: true,
      case10: 9,
      case7: 9,
      case6: 9,
      case4: 9,
      limit: 9,
      rating: 9,
      bitkoin: 18,
      cars: true,
      GB: 18,
      ruds: true,
      donat: 9,
      titan: true,
      topdon: true
    } 
  },

  // Уровень 86 → 87
  { 
    price: utils.numstring("75.000.000.000"), 
    bonus: { 
      balance: 3750000000,
      premium: true,
      vip: true,
      bilet: 46,
      busi: true,
      farm: true,
      case10: 9,
      case7: 9,
      case6: 9,
      case4: 9,
      limit: 9,
      rating: 9,
      bitkoin: 18,
      cars: true,
      GB: 18,
      ruds: true,
      donat: 9,
      titan: true,
      topdon: true
    } 
  },

  // Уровень 87 → 88
  { 
    price: utils.numstring("80.000.000.000"), 
    bonus: { 
      balance: 4000000000,
      premium: true,
      vip: true,
      bilet: 48,
      busi: true,
      farm: true,
      case10: 9,
      case7: 9,
      case6: 9,
      case4: 9,
      limit: 9,
      rating: 9,
      bitkoin: 18,
      cars: true,
      GB: 18,
      ruds: true,
      donat: 9,
      titan: true,
      topdon: true
    } 
  },

  // Уровень 88 → 89
  { 
    price: utils.numstring("85.000.000.000"), 
    bonus: { 
      balance: 4250000000,
      premium: true,
      vip: true,
      bilet: 48,
      busi: true,
      farm: true,
      case10: 9,
      case7: 9,
      case6: 9,
      case4: 9,
      limit: 9,
      rating: 9,
      bitkoin: 18,
      cars: true,
      GB: 18,
      ruds: true,
      donat: 9,
      titan: true,
      topdon: true
    } 
  },

  // Уровень 89 → 90
  { 
    price: utils.numstring("90.000.000.000"), 
    bonus: { 
      balance: 4500000000,
      premium: true,
      vip: true,
      bilet: 50,
      busi: true,
      farm: true,
      case10: 10,
      case7: 10,
      case6: 10,
      case4: 10,
      limit: 10,
      rating: 10,
      bitkoin: 20,
      cars: true,
      GB: 20,
      ruds: true,
      donat: 10,
      titan: true,
      topdon: true
    } 
  },
    // Уровень 90 → 91
  { 
    price: utils.numstring("100.000.000.000"), 
    bonus: { 
      balance: 5000000000,
      premium: true,
      vip: true,
      bilet: 50,
      busi: true,
      farm: true,
      case10: 10,
      case7: 10,
      case6: 10,
      case4: 10,
      limit: 10,
      rating: 10,
      bitkoin: 20,
      cars: true,
      GB: 20,
      ruds: true,
      donat: 10,
      titan: true,
      topdon: true
    } 
  },

  // Уровень 91 → 92
  { 
    price: utils.numstring("110.000.000.000"), 
    bonus: { 
      balance: 5500000000,
      premium: true,
      vip: true,
      bilet: 55,
      busi: true,
      farm: true,
      case10: 11,
      case7: 11,
      case6: 11,
      case4: 11,
      limit: 11,
      rating: 11,
      bitkoin: 22,
      cars: true,
      GB: 22,
      ruds: true,
      donat: 11,
      titan: true,
      topdon: true
    } 
  },

  // Уровень 92 → 93
  { 
    price: utils.numstring("120.000.000.000"), 
    bonus: { 
      balance: 6000000000,
      premium: true,
      vip: true,
      bilet: 60,
      busi: true,
      farm: true,
      case10: 12,
      case7: 12,
      case6: 12,
      case4: 12,
      limit: 12,
      rating: 12,
      bitkoin: 25,
      cars: true,
      GB: 25,
      ruds: true,
      donat: 12,
      titan: true,
      topdon: true
    } 
  },

  // Уровень 93 → 94
  { 
    price: utils.numstring("130.000.000.000"), 
    bonus: { 
      balance: 6500000000,
      premium: true,
      vip: true,
      bilet: 65,
      busi: true,
      farm: true,
      case10: 13,
      case7: 13,
      case6: 13,
      case4: 13,
      limit: 13,
      rating: 13,
      bitkoin: 28,
      cars: true,
      GB: 28,
      ruds: true,
      donat: 13,
      titan: true,
      topdon: true
    } 
  },

  // Уровень 94 → 95
  { 
    price: utils.numstring("140.000.000.000"), 
    bonus: { 
      balance: 7000000000,
      premium: true,
      vip: true,
      bilet: 70,
      busi: true,
      farm: true,
      case10: 14,
      case7: 14,
      case6: 14,
      case4: 14,
      limit: 14,
      rating: 14,
      bitkoin: 30,
      cars: true,
      GB: 30,
      ruds: true,
      donat: 14,
      titan: true,
      topdon: true
    } 
  },

  // Уровень 95 → 96
  { 
    price: utils.numstring("150.000.000.000"), 
    bonus: { 
      balance: 7500000000,
      premium: true,
      vip: true,
      bilet: 75,
      busi: true,
      farm: true,
      case10: 15,
      case7: 15,
      case6: 15,
      case4: 15,
      limit: 15,
      rating: 15,
      bitkoin: 35,
      cars: true,
      GB: 35,
      ruds: true,
      donat: 15,
      titan: true,
      topdon: true
    } 
  },

  // Уровень 96 → 97
  { 
    price: utils.numstring("160.000.000.000"), 
    bonus: { 
      balance: 8000000000,
      premium: true,
      vip: true,
      bilet: 80,
      busi: true,
      farm: true,
      case10: 16,
      case7: 16,
      case6: 16,
      case4: 16,
      limit: 16,
      rating: 16,
      bitkoin: 38,
      cars: true,
      GB: 38,
      ruds: true,
      donat: 16,
      titan: true,
      topdon: true
    } 
  },

  // Уровень 97 → 98
  { 
    price: utils.numstring("170.000.000.000"), 
    bonus: { 
      balance: 8500000000,
      premium: true,
      vip: true,
      bilet: 85,
      busi: true,
      farm: true,
      case10: 17,
      case7: 17,
      case6: 17,
      case4: 17,
      limit: 17,
      rating: 17,
      bitkoin: 40,
      cars: true,
      GB: 40,
      ruds: true,
      donat: 17,
      titan: true,
      topdon: true
    } 
  },

  // Уровень 98 → 99
  { 
    price: utils.numstring("180.000.000.000"), 
    bonus: { 
      balance: 9000000000,
      premium: true,
      vip: true,
      bilet: 90,
      busi: true,
      farm: true,
      case10: 18,
      case7: 18,
      case6: 18,
      case4: 18,
      limit: 18,
      rating: 18,
      bitkoin: 45,
      cars: true,
      GB: 45,
      ruds: true,
      donat: 18,
      titan: true,
      topdon: true
    } 
  },

  // Уровень 99 → 100
  { 
    price: utils.numstring("200.000.000.000"), 
    bonus: { 
      balance: 10000000000,
      premium: true,
      vip: true,
      bilet: 100,
      busi: true,
      farm: true,
      case10: 20,
      case7: 20,
      case6: 20,
      case4: 20,
      limit: 20,
      rating: 20,
      bitkoin: 50,
      cars: true,
      GB: 50,
      ruds: true,
      donat: 20,
      titan: true,
      topdon: true,
    } 
  }
];


module.exports = levelData;
