(function() {
  const quizPage = document.getElementById('quiz-page');
  const resultPage = document.getElementById('result-page');
  const progressFill = document.getElementById('progress-fill');
  const progressText = document.getElementById('progress-text');
  const categoryEl = document.getElementById('category');
  const questionEl = document.getElementById('question');
  const optionsEl = document.getElementById('options');
  const prevBtn = document.getElementById('prev-btn');
  const nextBtn = document.getElementById('next-btn');
  const copyBtn = document.getElementById('copy-btn');
  const restartBtn = document.getElementById('restart-btn');
  const resultContent = document.getElementById('result-content');

  let currentIndex = 0;
  let answers = {};
  let customInputs = {};

  function renderQuestion(index) {
    const q = questions[index];
    const total = questions.length;
    const progress = ((index + 1) / total) * 100;

    progressFill.style.width = progress + '%';
    progressText.textContent = (index + 1) + ' / ' + total;
    categoryEl.textContent = q.category;
    questionEl.textContent = q.question;

    const selectedValue = answers[q.id];
    const isMulti = q.type === 'multi';
    const selectedValues = isMulti && selectedValue ? selectedValue : [];

    optionsEl.innerHTML = '';

    q.options.forEach((opt, i) => {
      if (opt.isCustom) {
        renderCustomOption(q, opt, i);
      } else {
        renderNormalOption(q, opt, i, selectedValues, selectedValue);
      }
    });

    updateNavButtons();
  }

  function renderNormalOption(q, opt, i, selectedValues, selectedValue) {
    const div = document.createElement('div');
    div.className = 'option';
    div.style.animationDelay = (i * 50) + 'ms';

    let isSelected;
    if (q.type === 'multi') {
      isSelected = selectedValues.includes(opt.value);
    } else {
      isSelected = selectedValue === opt.value;
    }

    if (isSelected) {
      div.classList.add('selected');
    }

    div.innerHTML =
      '<span class="option-icon">' + opt.icon + '</span>' +
      '<span class="option-label">' + opt.label + '</span>' +
      '<span class="option-check">' + (isSelected ? '✓' : '') + '</span>';

    div.addEventListener('click', function() {
      if (q.type === 'multi') {
        handleMultiSelect(q, opt.value);
      } else {
        handleSingleSelect(q, opt.value);
      }
    });

    optionsEl.appendChild(div);
  }

  function renderCustomOption(q, opt, i) {
    const customValue = 'custom_' + q.id;
    const isMulti = q.type === 'multi';
    let isSelected;

    if (isMulti) {
      isSelected = answers[q.id] && answers[q.id].includes(customValue);
    } else {
      isSelected = answers[q.id] === customValue;
    }

    const container = document.createElement('div');
    container.className = 'custom-option-container';

    const div = document.createElement('div');
    div.className = 'option' + (isSelected ? ' selected' : '');
    div.style.animationDelay = (i * 50) + 'ms';
    div.innerHTML =
      '<span class="option-icon">' + opt.icon + '</span>' +
      '<span class="option-label">' + opt.label + '</span>' +
      '<span class="option-check">' + (isSelected ? '✓' : '') + '</span>';

    const inputContainer = document.createElement('div');
    inputContainer.className = 'custom-input-container' + (isSelected ? ' active' : '');
    inputContainer.style.display = isSelected ? 'block' : 'none';

    const input = document.createElement('input');
    input.type = 'text';
    input.className = 'custom-input';
    input.placeholder = '请输入你的想法...';
    input.value = customInputs[q.id] || '';

    input.addEventListener('input', function() {
      customInputs[q.id] = input.value;
      if (input.value.trim()) {
        if (isMulti) {
          if (!answers[q.id]) answers[q.id] = [];
          if (!answers[q.id].includes(customValue)) {
            answers[q.id].push(customValue);
          }
        } else {
          answers[q.id] = customValue;
        }
      }
      updateNavButtons();
    });

    input.addEventListener('click', function(e) {
      e.stopPropagation();
    });

    div.addEventListener('click', function() {
      if (isMulti) {
        handleMultiSelect(q, customValue);
      } else {
        handleSingleSelect(q, customValue);
      }
    });

    inputContainer.appendChild(input);
    container.appendChild(div);
    container.appendChild(inputContainer);
    optionsEl.appendChild(container);
  }

  function handleSingleSelect(q, value) {
    if (value && value.startsWith('custom_')) {
      answers[q.id] = value;
      renderQuestion(currentIndex);
      setTimeout(() => {
        const inputEl = document.querySelector('.custom-input');
        if (inputEl) inputEl.focus();
      }, 50);
      return;
    }
    answers[q.id] = value;
    renderQuestion(currentIndex);
  }

  function handleMultiSelect(q, value) {
    if (value && value.startsWith('custom_')) {
      if (!answers[q.id]) answers[q.id] = [];
      const idx = answers[q.id].indexOf(value);
      if (idx > -1) {
        answers[q.id].splice(idx, 1);
      } else {
        if (q.maxSelect && answers[q.id].length >= q.maxSelect) {
          return;
        }
        answers[q.id].push(value);
      }
      renderQuestion(currentIndex);
      setTimeout(() => {
        const inputEl = document.querySelector('.custom-input');
        if (inputEl) inputEl.focus();
      }, 50);
      return;
    }

    if (!answers[q.id]) {
      answers[q.id] = [];
    }

    const idx = answers[q.id].indexOf(value);
    if (idx > -1) {
      answers[q.id].splice(idx, 1);
    } else {
      if (q.maxSelect && answers[q.id].length >= q.maxSelect) {
        return;
      }
      answers[q.id].push(value);
    }

    renderQuestion(currentIndex);
  }

  function updateNavButtons() {
    const q = questions[currentIndex];
    let hasAnswer = false;

    if (q.type === 'multi') {
      hasAnswer = answers[q.id] && answers[q.id].length > 0;
      if (hasAnswer) {
        const hasCustom = answers[q.id].some(v => v.startsWith('custom_'));
        if (hasCustom) {
          hasAnswer = customInputs[q.id] && customInputs[q.id].trim().length > 0;
        }
      }
    } else {
      hasAnswer = answers[q.id] !== undefined;
      if (hasAnswer && answers[q.id].startsWith('custom_')) {
        hasAnswer = customInputs[q.id] && customInputs[q.id].trim().length > 0;
      }
    }

    prevBtn.disabled = currentIndex === 0;

    if (currentIndex === questions.length - 1) {
      nextBtn.textContent = '提交';
      nextBtn.disabled = !hasAnswer;
    } else {
      nextBtn.innerHTML = '下一题 <span class="btn-icon">→</span>';
      nextBtn.disabled = !hasAnswer;
    }
  }

  function goToPrev() {
    if (currentIndex > 0) {
      currentIndex--;
      renderQuestion(currentIndex);
    }
  }

  function goToNext() {
    if (currentIndex < questions.length - 1) {
      currentIndex++;
      renderQuestion(currentIndex);
    } else {
      submitQuiz();
    }
  }

  function submitQuiz() {
    const allAnswered = questions.every(q => {
      const ans = answers[q.id];
      if (!ans || (Array.isArray(ans) ? ans.length === 0 : false)) return false;

      if (Array.isArray(ans)) {
        const hasCustom = ans.some(v => v.startsWith('custom_'));
        if (hasCustom) {
          return customInputs[q.id] && customInputs[q.id].trim().length > 0;
        }
      } else if (ans.startsWith && ans.startsWith('custom_')) {
        return customInputs[q.id] && customInputs[q.id].trim().length > 0;
      }
      return true;
    });

    if (!allAnswered) {
      alert('请回答所有问题后再提交');
      return;
    }

    showResults();
  }

  function getAnswerDisplay(q, ans) {
    const isMulti = q.type === 'multi';
    const values = isMulti ? ans : [ans];
    const labels = [];

    values.forEach(v => {
      if (v && v.startsWith('custom_')) {
        const customText = customInputs[q.id];
        if (customText && customText.trim()) {
          labels.push({ icon: '✏️', label: customText.trim() });
        }
      } else {
        const opt = q.options.find(o => o.value === v);
        if (opt) {
          labels.push({ icon: opt.icon, label: opt.label });
        }
      }
    });

    return labels;
  }

  function showResults() {
    quizPage.classList.add('hidden');
    resultPage.classList.remove('hidden');

    let html = '';

    questions.forEach(q => {
      const ans = answers[q.id];
      const answerLabels = getAnswerDisplay(q, ans);

      html +=
        '<div class="result-item">' +
          '<div class="result-category">' + q.category + '</div>' +
          '<div class="result-question">' + q.question + '</div>' +
          '<div class="result-answer">';

      answerLabels.forEach(item => {
        html +=
          '<span class="result-tag">' +
            '<span class="result-tag-icon">' + item.icon + '</span>' +
            item.label +
          '</span>';
      });

      html += '</div></div>';
    });

    resultContent.innerHTML = html;
  }

  function generateResultText() {
    const summary = analyzePreferences();

    let text = summary.title + '\n\n';
    text += '核心需求：' + summary.core + '\n\n';
    text += '预算：' + summary.budget + '\n\n';
    text += '出行：' + summary.travel + '\n\n';
    text += '住宿：' + summary.stay + '\n\n';
    text += '美食：' + summary.food + '\n\n';
    text += '游玩：' + summary.play + '\n\n';
    text += '整体：' + summary.overall;

    return text;
  }

  function analyzePreferences() {
    const result = {
      title: '女友清明旅游偏好精简总结',
      core: '',
      budget: '',
      travel: '',
      stay: '',
      food: '',
      play: '',
      overall: ''
    };

    const destination = answers[1]?.startsWith?.('custom_') ? customInputs[1] : answers[1];
    const region = answers[2]?.startsWith?.('custom_') ? customInputs[2] : answers[2];
    const climate = answers[3]?.startsWith?.('custom_') ? customInputs[3] : answers[3];
    const days = answers[4]?.startsWith?.('custom_') ? customInputs[4] : answers[4];
    const budget = answers[5]?.startsWith?.('custom_') ? customInputs[5] : answers[5];
    const transport = answers[7]?.startsWith?.('custom_') ? customInputs[7] : answers[7];
    const rhythm = answers[8]?.startsWith?.('custom_') ? customInputs[8] : answers[8];
    const companion = answers[9]?.startsWith?.('custom_') ? customInputs[9] : answers[9];
    const hotelLevel = answers[10]?.startsWith?.('custom_') ? customInputs[10] : answers[10];
    const roomType = answers[11]?.startsWith?.('custom_') ? customInputs[11] : answers[11];
    const location = answers[12]?.startsWith?.('custom_') ? customInputs[12] : answers[12];
    const specialStay = answers[13] || [];
    const foodBudget = answers[14]?.startsWith?.('custom_') ? customInputs[14] : answers[14];
    const taste = answers[15]?.startsWith?.('custom_') ? customInputs[15] : answers[15];
    const foodType = answers[16] || [];
    const attractionType = answers[17]?.startsWith?.('custom_') ? customInputs[17] : answers[17];
    const ticket = answers[18]?.startsWith?.('custom_') ? customInputs[18] : answers[18];
    const visitStyle = answers[19] || [];

    const destLabel = getOptionLabel(1, destination);
    const regionLabel = getOptionLabel(2, region);
    const climateLabel = getOptionLabel(3, climate);
    const daysLabel = getOptionLabel(4, days);
    const budgetLabel = getOptionLabel(5, budget);
    const transportLabel = getOptionLabel(7, transport);
    const rhythmLabel = getOptionLabel(8, rhythm);
    const companionLabel = getOptionLabel(9, companion);
    const hotelLabel = getOptionLabel(10, hotelLevel);
    const roomLabel = getOptionLabel(11, roomType);
    const locationLabel = getOptionLabel(12, location);
    const foodBudgetLabel = getOptionLabel(14, foodBudget);
    const tasteLabel = getOptionLabel(15, taste);
    const attractionLabel = getOptionLabel(17, attractionType);
    const ticketLabel = getOptionLabel(18, ticket);

    const specialStayLabels = specialStay.map(v => v.startsWith('custom_') ? customInputs[13] : getOptionLabel(13, v)).filter(Boolean);
    const foodTypeLabels = foodType.map(v => v.startsWith('custom_') ? customInputs[16] : getOptionLabel(16, v)).filter(Boolean);
    const visitStyleLabels = visitStyle.map(v => v.startsWith('custom_') ? customInputs[19] : getOptionLabel(19, v)).filter(Boolean);

    result.core = (daysLabel || '待定') + '、' + (regionLabel || '待定') + '、' + (climateLabel || '待定') + '、' + (destLabel || '待定') + '，' + (companionLabel || '待定') + '，行程节奏' + (rhythmLabel || '待定') + '。';

    result.budget = '人均' + (budgetLabel || '待定') + '，餐饮每餐' + (foodBudgetLabel || '待定') + '，喜欢' + (tasteLabel || '待定') + (foodTypeLabels.length > 0 ? '、' + foodTypeLabels.join('、') : '') + '。';

    result.travel = '交通偏好' + (transportLabel || '待定') + '，同行' + (companionLabel || '待定') + '。';

    const stayParts = [];
    if (hotelLabel) stayParts.push(hotelLabel);
    if (locationLabel) stayParts.push(locationLabel);
    if (roomLabel) stayParts.push(roomLabel);
    if (specialStayLabels.length > 0) stayParts.push('想体验' + specialStayLabels.join('、'));
    result.stay = stayParts.length > 0 ? stayParts.join('，') + '。' : '待定。';

    const foodParts = [];
    if (foodBudgetLabel) foodParts.push(foodBudgetLabel);
    if (tasteLabel) foodParts.push(tasteLabel);
    if (foodTypeLabels.length > 0) foodParts.push('喜欢' + foodTypeLabels.join('、'));
    result.food = foodParts.length > 0 ? foodParts.join('，') + '。' : '待定。';

    const playParts = [];
    if (attractionLabel) playParts.push(attractionLabel + '类景点');
    if (visitStyleLabels.length > 0) playParts.push('逛景点想' + visitStyleLabels.join('、'));
    if (ticketLabel) playParts.push('门票' + ticketLabel);
    result.play = playParts.length > 0 ? playParts.join('，') + '。' : '待定。';

    const overalls = [];
    if (budgetLabel && budgetLabel.includes('500以下')) overalls.push('穷游预算');
    if (specialStayLabels.some(l => l.includes('海景') || l.includes('日出'))) overalls.push('浪漫海景');
    if (hotelLabel && (hotelLabel.includes('民宿') || hotelLabel.includes('特色'))) overalls.push('特色住宿');
    if (foodTypeLabels.some(l => l.includes('特色') || l.includes('夜市'))) overalls.push('品质美食');

    if (overalls.length > 0) {
      result.overall = '既有' + overalls.join('、') + '，' + (budgetLabel && budgetLabel.includes('500以下') ? '兼顾性价比' : '注重体验') + '的' + (companionLabel || '旅行') + '。';
    } else {
      result.overall = '正在规划中的清明' + (companionLabel || '旅行') + '。';
    }

    return result;
  }

  function getOptionLabel(questionId, value) {
    if (!value) return null;
    if (value.startsWith && value.startsWith('custom_')) {
      return customInputs[questionId] || null;
    }
    const q = questions.find(q => q.id === questionId);
    if (!q) return null;
    const opt = q.options.find(o => o.value === value);
    return opt ? opt.label.split('（')[0].split('（')[0] : null;
  }

  async function copyResults() {
    const text = generateResultText();

    try {
      await navigator.clipboard.writeText(text);
      const originalText = copyBtn.textContent;
      copyBtn.textContent = '已复制!';
      setTimeout(() => {
        copyBtn.textContent = originalText;
      }, 2000);
    } catch (err) {
      const textarea = document.createElement('textarea');
      textarea.value = text;
      textarea.style.position = 'fixed';
      textarea.style.opacity = '0';
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand('copy');
      document.body.removeChild(textarea);

      const originalText = copyBtn.textContent;
      copyBtn.textContent = '已复制!';
      setTimeout(() => {
        copyBtn.textContent = originalText;
      }, 2000);
    }
  }

  function restart() {
    currentIndex = 0;
    answers = {};
    customInputs = {};

    resultPage.classList.add('hidden');
    quizPage.classList.remove('hidden');

    renderQuestion(0);
  }

  prevBtn.addEventListener('click', goToPrev);
  nextBtn.addEventListener('click', goToNext);
  copyBtn.addEventListener('click', copyResults);
  restartBtn.addEventListener('click', restart);

  renderQuestion(0);
})();