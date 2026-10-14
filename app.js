const SUPABASE_URL = "https://supabase.co";
const SUPABASE_ANON_KEY = "sb_publishable_5lgqfIbSUBektYrMTt5r6g_tCNDS4KG";

const supabase = supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// ऐप शुरू होते ही ऑटो-लॉगइन चेक करें
window.onload = async () => {
    const { data: { session } } = await supabase.auth.getSession();
    if (session) {
        showScreen('app-screen');
        loadFeed();
    } else {
        showScreen('login-screen');
    }
};

// स्क्रीन बदलने का फंक्शन
function showScreen(screenId) {
    document.querySelectorAll('.screen').forEach(s => s.classList.add('hidden'));
    document.getElementById(screenId).classList.remove('hidden');
}

// नियम व शर्तों के साथ लॉगइन/साइनअप
async function login() {
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const termsChecked = document.getElementById('terms-checkbox').checked;

    if (!termsChecked) {
        alert("कृपया आगे बढ़ने के लिए भारत सरकार के नियम व शर्तों को स्वीकार करें।");
        return;
    }

    // पहले लॉगइन की कोशिश करें, अकाउंट न होने पर साइनअप करें
    const { data, error } = await supabase.auth.signInWithPassword({ email, password });
    
    if (error) {
        const { data: signUpData, error: signUpError } = await supabase.auth.signUp({ email, password });
        if (signUpError) alert("त्रुटि: " + signUpError.message);
        else alert("साइनअप सफल! ईमेल वेरिफिकेशन चेक करें या सीधे लॉगइन करें।");
    } else

    posts.forEach(post => {
        const postEl = document.createElement('div');
        postEl.className = 'post-card';
        postEl.innerHTML = `
            <video src="${post.video_url}" controls width="100%"></video>
            <div class="post-actions">
                <button onclick="likePost('${post.id}')">❤️ ${post.likes_count || 0}</button>
                <button onclick="sharePost('${post.video_url}')">🔗 शेयर</button>
                ${isProfile ? `<button class="delete-btn" onclick="deletePost('\${post.id}')">🗑️ डिलीट</button>` : ''}
            </div>
            <p class="location-tag">📍 ${post.village || ''}, ${post.district || ''} (${post.distance_km ? post.distance_km.toFixed(1) + ' किमी दूर' : ''})</p>
        `;
        container.appendChild(postEl);
    });
}

// शेयर बटन फंक्शनलिटी
function sharePost(url) {
    if (navigator.share) {
        navigator.share({ title: 'लोकल साथी पर वीडियो देखें', url: url });
    } else {
        alert("लिंक कॉपी कर ली गई है: " + url);
    }
}

// प्रोफाइल स्क्रीन दिखाना और सिर्फ अपने वीडियो लोड करना
async function showProfile() {
    showScreen('profile-screen');
    const { data: { user } } = await supabase.auth.getUser();
    
    const { data, error } = await supabase.from('posts').select('*').eq('user_id', user.id);
    if (!error) renderVideos(data, 'my-posts', true);
}

// वीडियो डिलीट करना
async function deletePost(postId) {
    if(confirm("क्या आप वाकई यह वीडियो डिलीट करना चाहते हैं?")) {
        const { erro
              
