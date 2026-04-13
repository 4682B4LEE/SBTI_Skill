# SBTI 测试定制器 (sbti-customizer)

一个通用的 Skill，允许用户基于 GitHub 上的 SBTI 源码一键替换内容，支持在任何可以执行 Skill 的 IDE 或开发工具中使用。

## 功能特性

- **项目初始化**：自动从 GitHub 仓库克隆 SBTI 源码
- **维度系统替换**：自定义维度元数据、解释和顺序
- **题目系统替换**：自定义常规问题和特殊问题
- **人格系统替换**：自定义人格信息和图片
- **匹配规则替换**：自定义人格匹配模式
- **验证与测试**：确保替换后的测试系统正常运行
- **部署配置**：提供本地部署和访问的指导

## 安装

1. 确保你的环境中安装了 Node.js
2. 克隆本技能到你的开发工具的技能目录
3. 确保 `main.js` 文件具有可执行权限

## 使用方法

### 1. 初始化项目

```bash
node main.js init --projectPath /path/to/your/project
```

这将从 GitHub 仓库（https://github.com/4682B4LEE/SBTI）克隆 SBTI 源码到指定路径。

### 2. 替换维度系统

```bash
node main.js replace-dimensions --projectPath /path/to/your/project --configFile /path/to/dimensions-config.json
```

**配置文件示例** (`dimensions-config.json`)：

```json
{
  "dimensionMeta": {
    "S1": { "name": "S1 SOLO 依赖度", "model": "SOLO 基因" },
    "S2": { "name": "S2 社交活跃度", "model": "SOLO 基因" },
    "S3": { "name": "S3 独处偏好度", "model": "SOLO 基因" },
    "S4": { "name": "S4 社会认同感", "model": "社会人格" },
    "S5": { "name": "S5 权威服从度", "model": "社会人格" },
    "S6": { "name": "S6 群体归属感", "model": "社会人格" },
    "S7": { "name": "S7 情绪稳定性", "model": "情感模式" },
    "S8": { "name": "S8 情感表达度", "model": "情感模式" },
    "S9": { "name": "S9 共情能力", "model": "情感模式" },
    "S10": { "name": "S10 逻辑思维", "model": "思维模式" },
    "S11": { "name": "S11 创造力", "model": "思维模式" },
    "S12": { "name": "S12 直觉能力", "model": "思维模式" },
    "S13": { "name": "S13 风险偏好", "model": "决策风格" },
    "S14": { "name": "S14 决策速度", "model": "决策风格" },
    "S15": { "name": "S15 计划程度", "model": "决策风格" }
  },
  "DIM_EXPLANATIONS": {
    "S1": { "L": "低", "M": "中", "H": "高" },
    "S2": { "L": "低", "M": "中", "H": "高" },
    "S3": { "L": "低", "M": "中", "H": "高" },
    "S4": { "L": "低", "M": "中", "H": "高" },
    "S5": { "L": "低", "M": "中", "H": "高" },
    "S6": { "L": "低", "M": "中", "H": "高" },
    "S7": { "L": "低", "M": "中", "H": "高" },
    "S8": { "L": "低", "M": "中", "H": "高" },
    "S9": { "L": "低", "M": "中", "H": "高" },
    "S10": { "L": "低", "M": "中", "H": "高" },
    "S11": { "L": "低", "M": "中", "H": "高" },
    "S12": { "L": "低", "M": "中", "H": "高" },
    "S13": { "L": "低", "M": "中", "H": "高" },
    "S14": { "L": "低", "M": "中", "H": "高" },
    "S15": { "L": "低", "M": "中", "H": "高" }
  },
  "dimensionOrder": ["S1", "S2", "S3", "S4", "S5", "S6", "S7", "S8", "S9", "S10", "S11", "S12", "S13", "S14", "S15"]
}
```

### 3. 替换题目系统

```bash
node main.js replace-questions --projectPath /path/to/your/project --configFile /path/to/questions-config.json
```

**配置文件示例** (`questions-config.json`)：

```json
{
  "questions": [
    {
      "id": 1,
      "dim": "S1",
      "text": "您平时有什么爱好？",
      "options": [
        { "label": "喜欢独处，看书或冥想", "value": 1 },
        { "label": "有时独处，有时社交", "value": 2 },
        { "label": "喜欢社交，参加各种活动", "value": 3 }
      ]
    },
    // 其他 29 个常规问题...
  ],
  "specialQuestions": [
    {
      "id": 31,
      "special": true,
      "kind": "alcohol",
      "text": "您对饮酒的态度是？",
      "options": [
        { "label": "不喜欢饮酒", "value": 1 },
        { "label": "偶尔饮酒", "value": 2 },
        { "label": "喜欢饮酒", "value": 3 }
      ]
    },
    {
      "id": 32,
      "special": true,
      "kind": "兜底",
      "text": "您的性格特点是什么？",
      "options": [
        { "label": "内向", "value": 1 },
        { "label": "中性", "value": 2 },
        { "label": "外向", "value": 3 }
      ]
    }
  ]
}
```

### 4. 替换人格系统

```bash
node main.js replace-personalities --projectPath /path/to/your/project --configFile /path/to/personalities-config.json --imagePath /path/to/images
```

**配置文件示例** (`personalities-config.json`)：

```json
{
  "TYPE_LIBRARY": {
    "HHHL": {
      "code": "HHHL",
      "cn": "领导者型",
      "intro": "具有强烈的领导能力和决策力",
      "desc": "您是一个天生的领导者，具有强烈的责任感和决策能力。您善于组织和管理，能够在复杂的情况下做出明智的决策。您重视效率和结果，总是追求卓越。"
    },
    // 其他人格...
  },
  "TYPE_IMAGES": {
    "HHHL": "./image/HHHL.png",
    "HHLH": "./image/HHLH.png",
    // 其他人格图片映射...
  }
}
```

### 5. 替换匹配规则

```bash
node main.js replace-matching-rules --projectPath /path/to/your/project --configFile /path/to/matching-rules-config.json
```

**配置文件示例** (`matching-rules-config.json`)：

```json
{
  "NORMAL_TYPES": [
    {
      "code": "HHHL",
      "pattern": "HHHMMLLMHLLHHHM"
    },
    {
      "code": "HHLH",
      "pattern": "HHLLMMHMLHLLHHM"
    },
    // 其他匹配规则...
  ]
}
```

### 6. 验证项目

```bash
node main.js validate --projectPath /path/to/your/project
```

这将验证项目的完整性和一致性，确保所有必要的配置都已正确设置。

### 7. 部署项目

```bash
node main.js deploy --projectPath /path/to/your/project --port 8000
```

这将启动本地服务器，并在指定端口上提供 SBTI 测试。访问地址为：http://localhost:8000

## 注意事项

- 确保你的配置文件格式正确，符合示例中的结构
- 维度数量建议保持 15 个，如需修改需同步更新相关逻辑
- 人格代码格式为 4 个字符的字符串，每个字符为 H、M、L 之一
- 图片文件应与人格代码一致，存放在 `image/` 目录中
- 匹配规则的模式长度应与维度数量一致，顺序应与 `dimensionOrder` 一致

## 故障排除

- **克隆失败**：检查网络连接，确保 GitHub 仓库可访问
- **替换失败**：检查配置文件格式，确保 JSON 语法正确
- **验证失败**：检查项目结构，确保所有必要的文件和目录存在
- **部署失败**：检查端口是否被占用，尝试使用不同的端口

## 许可证

MIT
