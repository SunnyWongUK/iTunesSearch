class CommentBox extends React.Component {
    render() {
        return (
            <div className="commentBox">Hello, world! I am a comment box.</div>
        );
    }
}

ReactDOM.render(<CommentBox />, document.getElementById('content'));
