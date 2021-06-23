const Block = (props) => {
    const { value, onClick, cMenu } = props;

    const getValue = () => {
        if (!value.isRevealed) {
            return props.value.isFlagged ? "🚩" : null;
        }
        if (value.isMine) {
            return "💣";
        }
        if (value.neighbour === 0) {
            return null;
        }
        return value.neighbour;
    }

    return (<div
        onClick={onClick}
        className={'block' + (value.isRevealed ? '' : ' hidden')}
        onContextMenu={cMenu}>
        {getValue()}
    </div>
    );
}

export default Block