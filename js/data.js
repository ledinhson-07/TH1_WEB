/**
 * SQUISHY WORLD - DATA REPOSITORY
 * Dữ liệu tập trung cho sản phẩm, danh mục và bài viết tin tức.
 * Dữ liệu được sử dụng đồng bộ cho toàn bộ website thông qua JavaScript thuần.
 */

const SQUISHY_DATA = {
  // Danh mục sản phẩm
  categories: [
    {
      id: "banh-ngot",
      name: "Squishy Bánh Ngọt",
      slug: "banh-ngot",
      icon: "images/squishy/squishy-001.webp",
      description: "Các mẫu bánh mì, donut, bánh kem mềm mịn thơm dịu",
      count: 3
    },
    {
      id: "dong-vat",
      name: "Squishy Động Vật",
      slug: "dong-vat",
      icon: "images/squishy/squishy-004.png",
      description: "Thế giới thú cưng đáng yêu: Mèo, Thỏ, Gấu, Vịt",
      count: 4
    },
    {
      id: "trai-cay",
      name: "Squishy Trái Cây",
      slug: "trai-cay",
      icon: "images/squishy/squishy-008.png",
      description: "Trái cây căng mọng sắc màu: Dâu tây, Quả đào, Quả bơ",
      count: 3
    },
    {
      id: "do-an",
      name: "Squishy Đồ Ăn Mini",
      slug: "do-an",
      icon: "images/squishy/squishy-011.png",
      description: "Bánh bao, đồ ăn vặt tí hon siêu đáng yêu",
      count: 2
    },
    {
      id: "cham-no",
      name: "Squishy Chậm Nở",
      slug: "cham-no",
      icon: "images/squishy/squishy-012.png",
      description: "Dòng Squishy xịn xò với tốc độ hồi phục 10-15s cực thư giãn",
      count: 2
    },
    {
      id: "moc-khoa",
      name: "Squishy Móc Khóa",
      slug: "moc-khoa",
      icon: "images/squishy/squishy-013.png",
      description: "Kích thước nhỏ gọn kèm móc khóa tiện lợi gắn balo",
      count: 1
    },
    {
      id: "hop-qua",
      name: "Hộp Quà Squishy",
      slug: "hop-qua",
      icon: "images/squishy/squishy-016.png",
      description: "Set quà tặng sang trọng bất ngờ dành tặng người thân",
      count: 1
    },
    {
      id: "khac",
      name: "Squishy Khác",
      slug: "khac",
      icon: "images/squishy/squishy-017.png",
      description: "Squishy độc lạ hot trend: Butter, Stress Ball, Phô mai vaseline, Xà phòng giòn, Croissant",
      count: 5
    }
  ],

  // Danh sách 16 sản phẩm Squishy chi tiết
  products: [
    {
      id: "squishy-001",
      name: "Squishy Bánh Mì Nướng Bơ Mềm",
      category: "banh-ngot",
      categoryName: "Squishy Bánh Ngọt",
      price: 45000,
      oldPrice: 55000,
      rating: 5,
      reviewCount: 38,
      isFeatured: true,
      isNew: false,
      isBestSeller: true,
      image: "images/squishy/squishy-001.webp",
      thumbnails: [
        "images/squishy/squishy-001.webp",
        "images/squishy/squishy-002.webp",
        "images/squishy/squishy-003.jpg"
      ],
      description: "Squishy lát bánh mì nướng bơ vàng ruộm với khuôn mặt cười tươi tắn. Chất liệu mút bọt biển PU Foam cao cấp, bóp cực êm tay và có hương thơm sữa ngọt dịu.",
      material: "PU Foam an toàn không độc hại",
      size: "10cm x 9cm x 3cm",
      weight: "65g",
      slowRisingSpeed: "Chậm nở 8-10 giây",
      stock: 45
    },
    {
      id: "squishy-002",
      name: "Squishy Donut Dâu Rắc Cốm Màu",
      category: "banh-ngot",
      categoryName: "Squishy Bánh Ngọt",
      price: 39000,
      oldPrice: 50000,
      rating: 5,
      reviewCount: 52,
      isFeatured: true,
      isNew: true,
      isBestSeller: true,
      image: "images/squishy/squishy-002.webp",
      thumbnails: [
        "images/squishy/squishy-002.webp",
        "images/squishy/squishy-001.webp",
        "images/squishy/squishy-014.png"
      ],
      description: "Chiếc bánh Donut phủ lớp kem dâu hồng ngọt ngào điểm xuyết những hạt cốm sắc màu rực rỡ. Rất thích hợp để giảm stress sau giờ học tập căng thẳng.",
      material: "Memory Foam siêu mềm",
      size: "Đường kính 9cm, độ dày 3.5cm",
      weight: "50g",
      slowRisingSpeed: "Chậm nở 10-12 giây",
      stock: 60
    },
    {
      id: "squishy-003",
      name: "Squishy Bánh Kem Dâu Shortcake",
      category: "banh-ngot",
      categoryName: "Squishy Bánh Ngọt",
      price: 59000,
      oldPrice: 75000,
      rating: 4.8,
      reviewCount: 29,
      isFeatured: false,
      isNew: true,
      isBestSeller: false,
      image: "images/squishy/squishy-003.jpg",
      thumbnails: [
        "images/squishy/squishy-003.jpg",
        "images/squishy/squishy-008.png",
        "images/squishy/squishy-001.webp"
      ],
      description: "Miếng bánh kem tam giác phong cách Nhật Bản nhiều lớp với quả dâu tây căng mọng trên chóp kem tuyết. Thiết kế sắc sảo từng đường nét.",
      material: "Eco PU Sponge đàn hồi",
      size: "11cm x 7cm x 6cm",
      weight: "75g",
      slowRisingSpeed: "Chậm nở 12-15 giây",
      stock: 28
    },
    {
      id: "squishy-004",
      name: "Squishy Mèo",
      category: "dong-vat",
      categoryName: "Squishy Động Vật",
      price: 65000,
      oldPrice: 85000,
      rating: 5,
      reviewCount: 74,
      isFeatured: true,
      isNew: false,
      isBestSeller: true,
      image: "images/squishy/squishy-004.png",
      thumbnails: [
        "images/squishy/squishy-004.png",
        "images/squishy/squishy-005.png",
        "images/squishy/squishy-006.png"
      ],
      description: "Bé mèo trắng tròn xoe với đôi tai viền hồng phấn và đôi má ửng hồng e thẹn. Khả năng đàn hồi siêu chậm cực kỳ sướng tay khi ấn bóp.",
      material: "Super Slow Rising PU",
      size: "10cm x 9.5cm x 8cm",
      weight: "85g",
      slowRisingSpeed: "Chậm nở 15-20 giây",
      stock: 50
    },
    {
      id: "squishy-005",
      name: "Squishy Thỏ",
      category: "dong-vat",
      categoryName: "Squishy Động Vật",
      price: 58000,
      oldPrice: 70000,
      rating: 4.9,
      reviewCount: 41,
      isFeatured: true,
      isNew: true,
      isBestSeller: false,
      image: "images/squishy/squishy-005.png",
      thumbnails: [
        "images/squishy/squishy-005.png",
        "images/squishy/squishy-004.png",
        "images/squishy/squishy-007.png"
      ],
      description: "Bé thỏ hồng pastel tai dài ngộ nghĩnh, biểu cảm đáng yêu khiến bạn muốn ôm mãi không rời. Màu sắc nhã nhặn phù hợp trang trí bàn học.",
      material: "PU Foam mềm dẻo",
      size: "14cm x 8cm x 7cm",
      weight: "80g",
      slowRisingSpeed: "Chậm nở 12 giây",
      stock: 35
    },
    {
      id: "squishy-006",
      name: "Squishy Gấu",
      category: "dong-vat",
      categoryName: "Squishy Động Vật",
      price: 52000,
      oldPrice: 65000,
      rating: 4.7,
      reviewCount: 33,
      isFeatured: false,
      isNew: false,
      isBestSeller: false,
      image: "images/squishy/squishy-006.png",
      thumbnails: [
        "images/squishy/squishy-006.png",
        "images/squishy/squishy-005.png",
        "images/squishy/squishy-013.png"
      ],
      description: "Chú gấu nâu sữa ngọt ngào phong cách Hàn Quốc với chiếc mũi nhỏ xíu và đôi mắt đen láy. Cảm giác bóp đầm tay, xua tan mọi mệt mỏi.",
      material: "PU Foam cao cấp",
      size: "10cm x 10cm x 8cm",
      weight: "78g",
      slowRisingSpeed: "Chậm nở 10 giây",
      stock: 40
    },
    {
      id: "squishy-007",
      name: "Squishy Vịt",
      category: "dong-vat",
      categoryName: "Squishy Động Vật",
      price: 48000,
      oldPrice: 60000,
      rating: 4.8,
      reviewCount: 46,
      isFeatured: true,
      isNew: true,
      isBestSeller: false,
      image: "images/squishy/squishy-007.png",
      thumbnails: [
        "images/squishy/squishy-007.png",
        "images/squishy/squishy-004.png",
        "images/squishy/squishy-015.png"
      ],
      description: "Bé vịt vàng với chiếc mỏ cam to bự và cọng tóc ngộ nghĩnh trên đỉnh đầu. Nắm chặt trong lòng bàn tay để cảm nhận độ mềm mại tối đa.",
      material: "PU Bọt xốp dẻo",
      size: "9cm x 9cm x 8.5cm",
      weight: "70g",
      slowRisingSpeed: "Chậm nở 9-11 giây",
      stock: 55
    },
    {
      id: "squishy-008",
      name: "Squishy Dâu Tây",
      category: "trai-cay",
      categoryName: "Squishy Trái Cây",
      price: 68000,
      oldPrice: 85000,
      rating: 5,
      reviewCount: 65,
      isFeatured: true,
      isNew: false,
      isBestSeller: true,
      image: "images/squishy/squishy-008.png",
      thumbnails: [
        "images/squishy/squishy-008.png",
        "images/squishy/squishy-009.png",
        "images/squishy/squishy-010.png"
      ],
      description: "Dâu tây Jumbo kích thước cực lớn, hương thơm dâu tây tự nhiên thơm mát phòng ngủ. Mặt hạt chấm trắng tỉ mỉ và tán lá xanh tươi.",
      material: "PU Foam cao cấp tẩm hương thơm nhẹ",
      size: "13cm x 10cm x 10cm",
      weight: "110g",
      slowRisingSpeed: "Chậm nở 15 giây",
      stock: 42
    },
    {
      id: "squishy-009",
      name: "Squishy Đào",
      category: "trai-cay",
      categoryName: "Squishy Trái Cây",
      price: 55000,
      oldPrice: 69000,
      rating: 4.9,
      reviewCount: 58,
      isFeatured: true,
      isNew: true,
      isBestSeller: false,
      image: "images/squishy/squishy-009.png",
      thumbnails: [
        "images/squishy/squishy-009.png",
        "images/squishy/squishy-008.png",
        "images/squishy/squishy-010.png"
      ],
      description: "Trái đào tiên quả tròn ửng hồng hình trái tim kèm chiếc lá xanh xinh xắn. Bề mặt mịn như nhung sờ cực kỳ thích tay.",
      material: "Soft Velvet-touch PU",
      size: "10.5cm x 10cm x 9cm",
      weight: "85g",
      slowRisingSpeed: "Chậm nở 14 giây",
      stock: 36
    },
    {
      id: "squishy-010",
      name: "Squishy Bơ",
      category: "trai-cay",
      categoryName: "Squishy Trái Cây",
      price: 49000,
      oldPrice: 62000,
      rating: 4.8,
      reviewCount: 39,
      isFeatured: false,
      isNew: false,
      isBestSeller: false,
      image: "images/squishy/squishy-010.png",
      thumbnails: [
        "images/squishy/squishy-010.png",
        "images/squishy/squishy-008.png",
        "images/squishy/squishy-009.png"
      ],
      description: "Nửa quả bơ xanh mướt với chiếc hột tròn màu nâu có khuôn mặt cười tít mắt. Sản phẩm bán chạy nhất trong bộ sưu tập trái cây hè.",
      material: "PU Foam dẻo dai",
      size: "11cm x 8cm x 6cm",
      weight: "72g",
      slowRisingSpeed: "Chậm nở 10 giây",
      stock: 48
    },
    {
      id: "squishy-011",
      name: "Squishy Bánh Bao",
      category: "do-an",
      categoryName: "Squishy Đồ Ăn Mini",
      price: 35000,
      oldPrice: 45000,
      rating: 4.6,
      reviewCount: 22,
      isFeatured: false,
      isNew: true,
      isBestSeller: false,
      image: "images/squishy/squishy-011.png",
      thumbnails: [
        "images/squishy/squishy-011.png",
        "images/squishy/squishy-014.png",
        "images/squishy/squishy-001.webp"
      ],
      description: "Chiếc bánh bao trắng nõn nà với những nếp gấp mềm mại trên đỉnh. Bóp xẹp lép rồi từ từ phồng to trở lại như vừa mới ra lò.",
      material: "TPR mềm dẻo co giãn cao",
      size: "7.5cm x 7.5cm x 6.5cm",
      weight: "60g",
      slowRisingSpeed: "Chậm nở 8 giây",
      stock: 50
    },
    {
      id: "squishy-012",
      name: "Squishy Đám Mây Cầu Vồng",
      category: "cham-no",
      categoryName: "Squishy Chậm Nở",
      price: 72000,
      oldPrice: 90000,
      rating: 5,
      reviewCount: 82,
      isFeatured: true,
      isNew: true,
      isBestSeller: true,
      image: "images/squishy/squishy-012.png",
      thumbnails: [
        "images/squishy/squishy-012.png",
        "images/squishy/squishy-004.png",
        "images/squishy/squishy-016.png"
      ],
      description: "Đám mây xốp trắng bồng bềnh thả rơi những dải sắc cầu vồng rực rỡ bên dưới. Tốc độ chậm nở thuộc hàng đỉnh cao của Squishy World.",
      material: "Premium Slow Rebound PU",
      size: "12cm x 9cm x 6cm",
      weight: "95g",
      slowRisingSpeed: "Chậm nở 18-20 giây",
      stock: 30
    },
    {
      id: "squishy-013",
      name: "Móc Khóa Squishy Bánh Quy Gấu",
      category: "moc-khoa",
      categoryName: "Squishy Móc Khóa",
      price: 29000,
      oldPrice: 38000,
      rating: 4.7,
      reviewCount: 67,
      isFeatured: false,
      isNew: false,
      isBestSeller: false,
      image: "images/squishy/squishy-013.png",
      thumbnails: [
        "images/squishy/squishy-013.png",
        "images/squishy/squishy-006.png",
        "images/squishy/squishy-014.png"
      ],
      description: "Squishy kích cỡ mini được gắn sẵn khoen móc khóa kim loại chắc chắn. Món phụ kiện đáng yêu treo chìa khóa hoặc balo đi học.",
      material: "PU Foam dẻo và khoen kim loại",
      size: "6cm x 6cm x 2cm",
      weight: "28g",
      slowRisingSpeed: "Chậm nở 6 giây",
      stock: 120
    },
    {
      id: "squishy-014",
      name: "Combo Squishy Đồ Ăn",
      category: "do-an",
      categoryName: "Squishy Đồ Ăn Mini",
      price: 99000,
      oldPrice: 135000,
      rating: 4.9,
      reviewCount: 44,
      isFeatured: true,
      isNew: false,
      isBestSeller: true,
      image: "images/squishy/squishy-014.png",
      thumbnails: [
        "images/squishy/squishy-014.png",
        "images/squishy/squishy-001.webp",
        "images/squishy/squishy-002.webp"
      ],
      description: "Bộ sưu tập 5 món đồ ăn mini bao gồm: bánh mì, donut, khoai tây, trứng ốp la và dâu tây. Mức giá combo siêu tiết kiệm dành cho người sưu tầm.",
      material: "Bộ 5 sản phẩm PU Foam",
      size: "Mỗi món 5-7cm",
      weight: "160g trọn bộ",
      slowRisingSpeed: "Chậm nở 7-10 giây",
      stock: 25
    },
    {
      id: "squishy-015",
      name: "Combo Squishy Động Vật",
      category: "dong-vat",
      categoryName: "Squishy Động Vật",
      price: 119000,
      oldPrice: 159000,
      rating: 5,
      reviewCount: 31,
      isFeatured: false,
      isNew: true,
      isBestSeller: false,
      image: "images/squishy/squishy-015.png",
      thumbnails: [
        "images/squishy/squishy-015.png",
        "images/squishy/squishy-004.png",
        "images/squishy/squishy-005.png"
      ],
      description: "Bộ ba thần thánh: Mèo trắng, Thỏ hồng và Gấu nâu. Đựng trong hộp quà trong suốt thắt nơ xinh xắn, là món quà hoàn hảo cho mọi lứa tuổi.",
      material: "Set 3 bé PU Foam cao cấp",
      size: "Mỗi bé 8cm x 7cm",
      weight: "220g",
      slowRisingSpeed: "Chậm nở 12-15 giây",
      stock: 18
    },
    {
      id: "squishy-016",
      name: "Hộp Quà Squishy Dreamy",
      category: "hop-qua",
      categoryName: "Hộp Quà Squishy",
      price: 189000,
      oldPrice: 240000,
      rating: 5,
      reviewCount: 53,
      isFeatured: true,
      isNew: true,
      isBestSeller: true,
      image: "images/squishy/squishy-016.png",
      thumbnails: [
        "images/squishy/squishy-016.png",
        "images/squishy/squishy-012.png",
        "images/squishy/squishy-008.png"
      ],
      description: "Hộp quà tặng Squishy phong cách Dreamy pastel với nơ ruy băng sang trọng, bao gồm 4 Squishy Jumbo tuyển chọn và thiệp chúc mừng viết tay.",
      material: "Hộp cứng cao cấp + 4 Squishy Jumbo",
      size: "24cm x 20cm x 10cm",
      weight: "450g",
      slowRisingSpeed: "Chậm nở 15-20 giây",
      stock: 15
    },
    {
      id: "squishy-017",
      name: "Squishy Butter",
      category: "khac",
      categoryName: "Squishy Khác",
      price: 55000,
      oldPrice: 70000,
      rating: 5,
      reviewCount: 96,
      isFeatured: true,
      isNew: true,
      isBestSeller: true,
      image: "images/squishy/squishy-017.png",
      thumbnails: [
        "images/squishy/squishy-017.png",
        "images/squishy/squishy-018.png",
        "images/squishy/squishy-019.png"
      ],
      description: "Thanh Squishy Salted Butter bơ vàng mềm mịn như bơ thật, nhét túi xách cực tiện lợi, bóp tạo cảm giác béo mịn đã tay xua tan căng thẳng.",
      material: "Silicon mềm cao cấp đàn hồi dẻo",
      size: "10cm x 3.5cm x 3cm",
      weight: "80g",
      slowRisingSpeed: "Đàn hồi chậm dẻo mềm",
      stock: 65
    },
    {
      id: "squishy-018",
      name: "Stress Ball",
      category: "khac",
      categoryName: "Squishy Khác",
      price: 49000,
      oldPrice: 65000,
      rating: 4.9,
      reviewCount: 112,
      isFeatured: true,
      isNew: true,
      isBestSeller: true,
      image: "images/squishy/squishy-018.png",
      thumbnails: [
        "images/squishy/squishy-018.png",
        "images/squishy/squishy-017.png",
        "images/squishy/squishy-020.png"
      ],
      description: "Bóng xả stress Translucent Blue Ultra Clear với kết cấu dẻo trong suốt óng ánh. Bóp cực nảy tay, tạo cảm giác thư giãn thị giác và xúc giác kỳ diệu.",
      material: "Gel Maltose dẻo trong suốt",
      size: "Đường kính 7cm",
      weight: "110g",
      slowRisingSpeed: "Đàn hồi phục hồi tức thì",
      stock: 80
    },
    {
      id: "squishy-019",
      name: "Phô Mai Vaseline",
      category: "khac",
      categoryName: "Squishy Khác",
      price: 52000,
      oldPrice: 68000,
      rating: 5,
      reviewCount: 78,
      isFeatured: true,
      isNew: true,
      isBestSeller: false,
      image: "images/squishy/squishy-019.png",
      thumbnails: [
        "images/squishy/squishy-019.png",
        "images/squishy/squishy-017.png",
        "images/squishy/squishy-021.png"
      ],
      description: "Khối phô mai Vaseline mềm nhũn núng nính với các lỗ khí đặc trưng. Cảm giác ấn vào lún sâu êm ái như kem phô mai tươi béo ngậy.",
      material: "Vaseline TPE mềm dẻo đặc biệt",
      size: "8cm x 8cm x 5cm",
      weight: "90g",
      slowRisingSpeed: "Chậm nở 12-14 giây",
      stock: 45
    },
    {
      id: "squishy-020",
      name: "Xà Phòng Giòn",
      category: "khac",
      categoryName: "Squishy Khác",
      price: 59000,
      oldPrice: 75000,
      rating: 4.8,
      reviewCount: 63,
      isFeatured: false,
      isNew: true,
      isBestSeller: true,
      image: "images/squishy/squishy-020.png",
      thumbnails: [
        "images/squishy/squishy-020.png",
        "images/squishy/squishy-018.png",
        "images/squishy/squishy-017.png"
      ],
      description: "Squishy cục xà phòng Crunchy Texture giòn rụm phát ra âm thanh lách tách khi bóp nén, đồ chơi ASMR hot trend giải tỏa âu lo cực đỉnh.",
      material: "Crunchy Sound Sponge cao cấp",
      size: "11cm x 6cm x 4cm",
      weight: "85g",
      slowRisingSpeed: "Giòn xốp đàn hồi nhanh",
      stock: 55
    },
    {
      id: "squishy-021",
      name: "Bánh Croissant",
      category: "khac",
      categoryName: "Squishy Khác",
      price: 45000,
      oldPrice: 58000,
      rating: 4.9,
      reviewCount: 51,
      isFeatured: false,
      isNew: true,
      isBestSeller: false,
      image: "images/squishy/squishy-021.png",
      thumbnails: [
        "images/squishy/squishy-021.png",
        "images/squishy/squishy-017.png",
        "images/squishy/squishy-019.png"
      ],
      description: "Bánh sừng bò Croissant nướng bơ vàng ruộm hình trăng khuyết với biểu cảm cười xinh xắn, chất liệu xốp thơm mùi bơ sữa.",
      material: "PU Foam mềm dẻo",
      size: "12cm x 7cm x 5cm",
      weight: "65g",
      slowRisingSpeed: "Chậm nở 10 giây",
      stock: 70
    }
  ],

  // Danh sách bài viết blog
  blogs: [
    {
      id: "blog-001",
      title: "Cách Bảo Quản Squishy Luôn Mềm Mại Và Thơm Mát Như Mới Mua",
      date: "24 Tháng 10, 2026",
      author: "Ngọc Mai (Squishy World)",
      category: "Mẹo bảo quản",
      image: "images/news/news-1.png",
      summary: "Đồ chơi Squishy sau thời gian dài sử dụng thường dễ bám bụi bẩn hoặc bị khô bề mặt. Khám phá ngay quy trình 4 bước vệ sinh và bảo quản Squishy từ chuyên gia.",
      content: `
        <p>Squishy là món đồ chơi xốp mềm đàn hồi được làm từ bọt biển polyurethane (PU Foam) hoặc silicon TPR. Sau một thời gian cầm nắm, mồ hôi tay và bụi mịn trong không khí có thể khiến chiếc Squishy đáng yêu của bạn bị ố bẩn hoặc mất đi mùi thơm ngọt ngào ban đầu. Dưới đây là những bí quyết đơn giản giúp bạn giữ gìn Squishy luôn như mới.</p>
        
        <h3>1. Tránh ánh nắng mặt trời trực tiếp và nguồn nhiệt cao</h3>
        <p>Vật liệu mút xốp PU Foam rất nhạy cảm với nhiệt độ và tia cực tím. Để Squishy gần cửa sổ có nắng chiếu trực tiếp hoặc gần máy sấy tóc sẽ làm cấu trúc bọt khí bị phá vỡ, khiến đồ chơi bị xơ cứng, phai màu và mất đi độ chậm nở tuyệt vời.</p>

        <h3>2. Cách vệ sinh Squishy đúng chuẩn theo chất liệu</h3>
        <p>Đối với Squishy PU Foam, tuyệt đối <strong>không ngâm nước xà phòng quá lâu</strong> vì nước thấm sâu vào lõi mút sẽ rất khó khô hoàn toàn, dễ sinh nấm mốc bên trong. Bạn nên dùng khăn ướt em bé không cồn lau nhẹ bề mặt, sau đó dùng khăn bông thấm khô ráo.</p>
        <p>Đối với Squishy chất liệu silicon dẻo (TPR), bạn có thể rửa trực tiếp dưới vòi nước ấm với một ít sữa tắm dịu nhẹ, sau đó phủ một lớp mỏng phấn rôm trẻ em để bề mặt không bị rít dính.</p>

        <h3>3. Cách phục hồi hương thơm ngọt ngào</h3>
        <p>Nếu chiếc Squishy của bạn bị mất mùi hoặc bám mùi lạ, hãy đặt nó vào một hộp kín cùng một túi thơm hương vani hoặc dâu tây trong vòng 24 - 48 giờ. Mút xốp sẽ tự nhiên thẩm thấu hương thơm tinh khiết trở lại.</p>

        <h3>4. Bảo quản trong túi zip hoặc tủ trưng bày</h3>
        <p>Khi không sử dụng, hãy cất Squishy trong túi zip trong suốt hoặc tủ kính trưng bày. Điều này vừa giúp bạn ngăn bụi bẩn bám dính, vừa tạo nên một góc sưu tập decor phòng học siêu xinh xắn!</p>
      `,
      tags: ["Bảo quản", "Vệ sinh Squishy", "Mẹo hay"]
    },
    {
      id: "blog-002",
      title: "Top Những Dòng Squishy Chậm Nở (Slow Rising) Đáng Mua Nhất",
      date: "18 Tháng 10, 2026",
      author: "Hoàng Anh",
      category: "Kiến thức Squishy",
      image: "images/news/news-2.png",
      summary: "Squishy chậm nở (Slow Rising) mang lại trải nghiệm giải tỏa căng thẳng kỳ diệu. Cùng điểm danh các dòng Squishy có thời gian nở lên tới 20 giây cực mê mẩn.",
      content: `
        <p>Trong thế giới Squishy, chỉ số "Slow Rising" (thời gian phồng trở lại hình dáng ban đầu sau khi bóp méo) là tiêu chí hàng đầu để đánh giá chất lượng và đẳng cấp của một mẫu Squishy. Càng nở chậm và êm ái, trải nghiệm xúc giác đem lại càng thư thái.</p>

        <h3>Tại sao Squishy chậm nở lại gây sốt đến vậy?</h3>
        <p>Cơ chế giảm áp lực của Squishy bắt nguồn từ xúc giác: khi bạn dồn toàn bộ lực bàn tay để nén đồ vật rồi ngắm nhìn nó từ từ phục hồi từng mili-mét, não bộ sẽ tiết ra endorphin giúp hạ nhịp tim và xoa dịu cảm giác lo âu trong học tập, thi cử.</p>

        <h3>Tiêu chí chọn Squishy chậm nở đạt chuẩn:</h3>
        <ul>
          <li><strong>Độ đàn hồi đồng đều:</strong> Khi nở không bị méo mó cục bộ hay xuất hiện vết nứt chân chim.</li>
          <li><strong>Thời gian nở lý tưởng:</strong> Dao động từ 10 đến 20 giây đối với các dòng Squishy cao cấp.</li>
          <li><strong>Bề mặt mịn màng:</strong> Không dính nhờn, không bong tróc lớp sơn phủ bên ngoài.</li>
        </ul>

        <p>Tại Squishy World, các dòng sản phẩm như <em>Mèo Trắng Chậm Nở</em> hay <em>Đám Mây Cầu Vồng</em> đều được sản xuất theo tiêu chuẩn kiểm định an toàn nghiêm ngặt, đảm bảo thời gian chậm nở đỉnh cao.</p>
      `,
      tags: ["Slow Rising", "Review", "Xả stress"]
    },
    {
      id: "blog-003",
      title: "Gợi Ý Chọn Squishy Làm Quà Tặng Cho Bạn Bè Cực Kỳ Dễ Thương",
      date: "10 Tháng 10, 2026",
      author: "Thu Phương",
      category: "Gợi ý quà tặng",
      image: "images/news/news-3.png",
      summary: "Bạn đang băn khoăn tìm một món quà sinh nhật vừa đáng yêu vừa túi tiền sinh viên? Khám phá ngay những set quà Squishy ngọt ngào khiến ai nhận cũng phải mỉm cười.",
      content: `
        <p>Một món quà ý nghĩa không nhất thiết phải đắt tiền, mà quan trọng là sự tinh tế và niềm vui mà nó mang lại cho người nhận. Squishy đang trở thành xu hướng quà tặng hàng đầu của giới trẻ hiện nay nhờ vẻ ngoài ngọt ngào và tính ứng dụng xả stress thiết thực.</p>

        <h3>1. Quà tặng dành cho bạn bè mê ẩm thực ngọt ngào</h3>
        <p>Nếu cô bạn thân là một tín đồ của bánh ngọt và trà sữa, chiếc <strong>Squishy Bánh Mì Nướng Bơ</strong> hoặc <strong>Donut Dâu</strong> sẽ là lựa chọn không thể tuyệt vời hơn. Vừa giống thật đến 99%, vừa phảng phất hương thơm bơ sữa kích thích vị giác.</p>

        <h3>2. Quà tặng dành cho người yêu động vật</h3>
        <p>BST thú cưng như Mèo má hồng, Thỏ tai dài hay Gấu con sẽ làm tan chảy bất cứ trái tim nào. Đặt một chú mèo xốp xinh xắn trên bàn làm việc sẽ tiếp thêm thật nhiều năng lượng tích cực mỗi ngày.</p>

        <h3>3. Hộp quà Dreamy Box cho dịp đặc biệt</h3>
        <p>Đối với dịp sinh nhật hay lễ kỷ niệm, lựa chọn một <strong>Hộp Quà Squishy Dreamy Box</strong> được chuẩn bị sẵn kèm thiệp chúc mừng sẽ thể hiện trọn vẹn sự chu đáo của bạn mà không tốn nhiều thời gian gói ghém.</p>
      `,
      tags: ["Quà tặng", "Sinh nhật", "Ý tưởng quà tặng"]
    }
  ]
};

// Đóng băng dữ liệu mẫu để chống sửa đổi ngoài ý muốn
Object.freeze(SQUISHY_DATA);
