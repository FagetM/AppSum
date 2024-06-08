document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('fetch-form').addEventListener('submit', function(e) {
        e.preventDefault();
        var url = document.getElementById('url').value;
        
        fetch('/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: new URLSearchParams({ url: url }).toString()
        })
        .then(response => response.json())
        .then(data => {
            var articleContent = document.getElementById('article-content');
            if (data.error) {
                articleContent.innerHTML = '<p>Error: ' + data.error + '</p>';
            } else {
                var content = '<h2>' + data.title + '</h2>';
                content += '<p><strong>Auteurs:</strong> ' + data.authors.join(', ') + '</p>';
                content += '<p><strong>Date de publication:</strong> ' + data.publish_date + '</p>';
                content += '<p>' + data.text + '</p>';
                articleContent.innerHTML = content;
            }
            articleContent.classList.add('show');
        })
        .catch(error => {
            console.error('Error:', error);
        });
    });
});
