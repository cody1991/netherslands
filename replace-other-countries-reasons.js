import fs from 'fs';

console.log('🔄 替换荷兰和其他国家景点通用推荐理由...\n');

const content = fs.readFileSync('src/pages/PlaceDetail.jsx', 'utf8');
let newContent = content;

// 定义荷兰景点替换映射
const netherlandsReplacements = {
  '奶酪工厂': '荷兰奶酪工厂是传统乳制品文化的重要代表，传统的制作工艺和优质的奶酪产品展现了荷兰农业文化的独特魅力。',
  '传统荷兰建筑': '传统荷兰建筑展现了荷兰建筑文化的精髓，独特的建筑风格和精美的装饰展现了荷兰建筑艺术的独特魅力。',
  '19座风车': '19座风车是荷兰风车文化的象征，保存完好的风车和传统工艺展现了荷兰水利工程的历史成就。',
  '荷兰田园风光': '荷兰田园风光是欧洲最美丽的乡村景观之一，平坦的土地和整齐的农田构成了典型的荷兰乡村画卷。',
  'De 9 Straatjes': 'De 9 Straatjes是阿姆斯特丹最时尚的购物区，保存完好的历史建筑和现代精品店完美融合，是体验阿姆斯特丹时尚文化的重要场所。',
  'Vondelpark': 'Vondelpark是阿姆斯特丹最美丽的公园，茂密的树木和宁静的环境为游客提供了远离城市喧嚣的理想场所。',
  'Albert Cuypmarkt': 'Albert Cuypmarkt是阿姆斯特丹最著名的市场，新鲜的食材和丰富的商品展现了荷兰传统市场文化的独特魅力。',
  '风车De Adriaan': '风车De Adriaan是荷兰风车文化的重要代表，保存完好的风车和传统工艺展现了荷兰水利工程的历史成就。',
  '赞斯风车村': '赞斯风车村是荷兰风车文化的象征，保存完好的风车和传统工艺展现了荷兰水利工程的历史成就。',
  '传统木鞋作坊': '传统木鞋作坊是荷兰手工艺文化的重要代表，精湛的制作工艺和精美的产品展现了荷兰传统手工艺的独特魅力。',
  '海鲜餐厅': '荷兰海鲜餐厅展现了北海饮食文化的精髓，新鲜的食材和传统的烹饪方法造就了令人难忘的美食体验。',
  '海滨长廊': '荷兰海滨长廊展现了北海海岸的壮丽，美丽的海滩和清新的海风构成了完美的度假环境。',
  '花市': '荷兰花市是花卉文化的重要代表，丰富的花卉品种和精美的展示展现了荷兰花卉产业的独特魅力。',
  '传统风车': '传统风车是荷兰文化的重要象征，保存完好的风车和传统工艺展现了荷兰水利工程的历史成就。',
  '传统民居': '传统民居是荷兰建筑文化的重要代表，独特的建筑风格和精美的装饰展现了荷兰建筑艺术的独特魅力。',
  '传统服饰摄影': '传统服饰摄影是荷兰文化体验的重要方式，精美的传统服饰和专业的摄影服务为游客提供了难忘的文化体验。',
  '海堤': '荷兰海堤是水利工程的重要代表，宏伟的堤坝和先进的工程技术展现了荷兰人与海争地的智慧。',
  '奶酪搬运工': '奶酪搬运工是荷兰传统职业的代表，传统的搬运方式和精美的表演展现了荷兰传统职业文化的独特魅力。',
  '郁金香海洋': '郁金香海洋是荷兰最美丽的自然景观之一，五彩斑斓的花海和芬芳的香气为游客提供了难忘的视觉和嗅觉体验。',
  '花卉展示': '荷兰花卉展示是花卉文化的重要代表，丰富的花卉品种和精美的展示展现了荷兰花卉产业的独特魅力。',
  '皇家代尔夫特': '皇家代尔夫特是荷兰陶瓷文化的重要代表，精美的蓝白陶瓷和传统的制作工艺展现了荷兰陶瓷艺术的独特魅力。',
  '伦勃朗故居': '伦勃朗故居是荷兰绘画大师的创作地，保存完好的工作室和丰富的艺术收藏为艺术爱好者提供了了解伦勃朗艺术的重要窗口。',
  '大丽花花田': '大丽花花田是荷兰最美丽的自然景观之一，五彩斑斓的花海和芬芳的香气为游客提供了难忘的视觉和嗅觉体验。',
  '梵高之家': '梵高之家是后印象派大师的出生地，保存完好的故居和丰富的艺术收藏为艺术爱好者提供了了解梵高艺术的重要窗口。',
  '花车游行': '花车游行是荷兰传统节日的重要活动，精美的花车和热闹的庆祝活动展现了荷兰传统节日的魅力。',
  'Sassenpoort城门': 'Sassenpoort城门是荷兰历史建筑的重要代表，保存完好的城门和丰富的历史使其成为了解荷兰历史的重要窗口。'
};

// 定义其他国家景点替换映射
const otherCountryReplacements = {
  '涂鸦街': '布鲁塞尔的涂鸦街是街头艺术文化的重要代表，丰富的涂鸦作品和艺术氛围展现了比利时现代艺术的独特魅力。',
  '大贝居安会院': '布鲁日的大贝居安会院是比利时宗教建筑的重要代表，精美的建筑和丰富的历史使其成为了解比利时宗教文化的重要场所。',
  'Stella Artois啤酒厂': 'Stella Artois啤酒厂是比利时啤酒文化的重要代表，传统的酿造工艺和优质的啤酒产品展现了比利时啤酒文化的独特魅力。',
  '安特卫普中央车站': '安特卫普中央车站是比利时建筑艺术的重要代表，精美的建筑和现代化的设施展现了比利时建筑艺术的独特魅力。',
  '巧克力': '比利时巧克力是世界上最著名的巧克力之一，精湛的制作工艺和优质的原料造就了令人难忘的巧克力体验。',
  '贝居安会院': '贝居安会院是比利时宗教建筑的重要代表，精美的建筑和丰富的历史使其成为了解比利时宗教文化的重要场所。',
  '根特祭坛画': '根特祭坛画是比利时宗教艺术的重要代表，精美的绘画和丰富的历史背景使其成为了解比利时宗教艺术的重要窗口。',
  'Graslei和Korenlei': 'Graslei和Korenlei是根特最美丽的街区，保存完好的历史建筑和美丽的运河构成了典型的佛兰德景观。',
  '中央火车站': '比利时中央火车站是建筑艺术的重要代表，精美的建筑和现代化的设施展现了比利时建筑艺术的独特魅力。',
  '圣家堂': '巴塞罗那的圣家堂是高迪建筑艺术的杰作，独特的建筑风格和精美的装饰展现了西班牙现代主义建筑的独特魅力。',
  '巴特罗之家': '巴特罗之家是高迪建筑艺术的重要代表，独特的建筑风格和精美的装饰展现了西班牙现代主义建筑的独特魅力。',
  '米拉之家': '米拉之家是高迪建筑艺术的杰作，独特的建筑风格和精美的装饰展现了西班牙现代主义建筑的独特魅力。',
  '哥特区': '巴塞罗那的哥特区是历史建筑的重要代表，保存完好的中世纪建筑和丰富的历史使其成为了解西班牙历史的重要窗口。',
  '大喷泉': '日内瓦的大喷泉是瑞士最著名的地标之一，壮观的喷泉和美丽的湖景构成了令人难忘的景观。',
  '联合国总部': '日内瓦的联合国总部是国际政治的重要象征，现代建筑和丰富的政治文化使其成为了解国际政治的重要场所。',
  '教皇接见(周三上午)': '梵蒂冈的教皇接见是宗教文化的重要体验，庄严的仪式和浓厚的宗教氛围为信徒提供了难忘的宗教体验。',
  '拉斐尔画室': '梵蒂冈的拉斐尔画室是文艺复兴艺术的重要代表，精美的壁画和丰富的艺术收藏展现了文艺复兴艺术的辉煌成就。',
  '易北爱乐厅': '汉堡的易北爱乐厅是德国现代建筑的重要代表，独特的建筑风格和先进的音响设施展现了德国建筑艺术的独特魅力。',
  '微缩景观世界': '汉堡的微缩景观世界是德国文化的重要代表，精美的微缩模型和丰富的展示内容展现了德国文化的独特魅力。',
  '健力士啤酒厂': '都柏林的健力士啤酒厂是爱尔兰啤酒文化的重要代表，传统的酿造工艺和优质的啤酒产品展现了爱尔兰啤酒文化的独特魅力。',
  '蒙特卡洛歌剧院': '蒙特卡洛歌剧院是摩纳哥文化的重要代表，精美的建筑和丰富的演出节目展现了摩纳哥文化艺术的独特魅力。',
  '欧洲法院': '卢森堡的欧洲法院是欧洲法律的重要象征，现代建筑和丰富的法律文化使其成为了解欧洲法律的重要场所。'
};

// 执行荷兰景点替换
let replacedCount = 0;
Object.entries(netherlandsReplacements).forEach(([name, reason]) => {
  const oldPattern = `'${name}': '这是荷兰值得一游的重要景点，拥有独特的魅力和丰富的文化内涵，是深入了解当地历史文化的好去处。'`;
  const newPattern = `'${name}': '${reason}'`;

  if (newContent.includes(oldPattern)) {
    newContent = newContent.replace(oldPattern, newPattern);
    replacedCount++;
    console.log(`✅ 替换荷兰: ${name}`);
  }
});

// 执行其他国家景点替换
Object.entries(otherCountryReplacements).forEach(([name, reason]) => {
  // 比利时
  const belgiumPattern = `'${name}': '这是比利时值得一游的重要景点，拥有独特的魅力和丰富的文化内涵，是深入了解当地历史文化的好去处。'`;
  const belgiumNewPattern = `'${name}': '${reason}'`;

  if (newContent.includes(belgiumPattern)) {
    newContent = newContent.replace(belgiumPattern, belgiumNewPattern);
    replacedCount++;
    console.log(`✅ 替换比利时: ${name}`);
  }

  // 西班牙
  const spainPattern = `'${name}': '这是西班牙值得一游的重要景点，拥有独特的魅力和丰富的文化内涵，是深入了解当地历史文化的好去处。'`;
  const spainNewPattern = `'${name}': '${reason}'`;

  if (newContent.includes(spainPattern)) {
    newContent = newContent.replace(spainPattern, spainNewPattern);
    replacedCount++;
    console.log(`✅ 替换西班牙: ${name}`);
  }

  // 瑞士
  const switzerlandPattern = `'${name}': '这是瑞士值得一游的重要景点，拥有独特的魅力和丰富的文化内涵，是深入了解当地历史文化的好去处。'`;
  const switzerlandNewPattern = `'${name}': '${reason}'`;

  if (newContent.includes(switzerlandPattern)) {
    newContent = newContent.replace(switzerlandPattern, switzerlandNewPattern);
    replacedCount++;
    console.log(`✅ 替换瑞士: ${name}`);
  }

  // 梵蒂冈
  const vaticanPattern = `'${name}': '这是梵蒂冈值得一游的重要景点，拥有独特的魅力和丰富的文化内涵，是深入了解当地历史文化的好去处。'`;
  const vaticanNewPattern = `'${name}': '${reason}'`;

  if (newContent.includes(vaticanPattern)) {
    newContent = newContent.replace(vaticanPattern, vaticanNewPattern);
    replacedCount++;
    console.log(`✅ 替换梵蒂冈: ${name}`);
  }

  // 德国
  const germanyPattern = `'${name}': '这是德国值得一游的重要景点，拥有独特的魅力和丰富的文化内涵，是深入了解当地历史文化的好去处。'`;
  const germanyNewPattern = `'${name}': '${reason}'`;

  if (newContent.includes(germanyPattern)) {
    newContent = newContent.replace(germanyPattern, germanyNewPattern);
    replacedCount++;
    console.log(`✅ 替换德国: ${name}`);
  }

  // 爱尔兰
  const irelandPattern = `'${name}': '这是爱尔兰值得一游的重要景点，拥有独特的魅力和丰富的文化内涵，是深入了解当地历史文化的好去处。'`;
  const irelandNewPattern = `'${name}': '${reason}'`;

  if (newContent.includes(irelandPattern)) {
    newContent = newContent.replace(irelandPattern, irelandNewPattern);
    replacedCount++;
    console.log(`✅ 替换爱尔兰: ${name}`);
  }

  // 摩纳哥
  const monacoPattern = `'${name}': '这是摩纳哥值得一游的重要景点，拥有独特的魅力和丰富的文化内涵，是深入了解当地历史文化的好去处。'`;
  const monacoNewPattern = `'${name}': '${reason}'`;

  if (newContent.includes(monacoPattern)) {
    newContent = newContent.replace(monacoPattern, monacoNewPattern);
    replacedCount++;
    console.log(`✅ 替换摩纳哥: ${name}`);
  }

  // 卢森堡
  const luxembourgPattern = `'${name}': '这是卢森堡值得一游的重要景点，拥有独特的魅力和丰富的文化内涵，是深入了解当地历史文化的好去处。'`;
  const luxembourgNewPattern = `'${name}': '${reason}'`;

  if (newContent.includes(luxembourgPattern)) {
    newContent = newContent.replace(luxembourgPattern, luxembourgNewPattern);
    replacedCount++;
    console.log(`✅ 替换卢森堡: ${name}`);
  }
});

// 保存文件
fs.writeFileSync('src/pages/PlaceDetail.jsx', newContent);

console.log(`\n🎉 成功替换了 ${replacedCount} 个景点的推荐理由！`);
