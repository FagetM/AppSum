from flask import Flask, render_template, request, jsonify
from newspaper import Article

app = Flask(__name__)

@app.route('/', methods=['GET', 'POST'])
def index():
    if request.method == 'POST':
        url = request.form['url']
        try:
            article = Article(url)
            article.download()
            article.parse()
            content = {
                'title': article.title,
                'authors': article.authors,
                'publish_date': article.publish_date.strftime('%Y-%m-%d') if article.publish_date else 'Unknown',
                'text': article.text
            }
        except Exception as e:
            content = {'error': str(e)}
        
        return jsonify(content)
    
    return render_template('index.html')

if __name__ == '__main__':
    app.run(debug=True)
