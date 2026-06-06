import { useState } from 'react';
import { Type, Pentagon, Image, HelpCircle, X, Copy } from 'lucide-react';
import { useSprites, createTextSprite, createShapeSprite } from '../lib/sprites';

export default function SpritePanel() {
	const { state, dispatch } = useSprites();
	const [showMenu, setShowMenu] = useState(false);

	const handleAdd = (type: 'text' | 'shape') => {
		const count = state.sprites.filter(s => s.type === type).length + 1;
		const sprite = type === 'text'
			? createTextSprite(`Text ${count}`)
			: createShapeSprite(`Shape ${count}`);
		dispatch({ type: 'ADD_SPRITE', sprite });
		setShowMenu(false);
	};

	const iconForType = (type: string) => {
		switch (type) {
			case 'text': return <Type size={16} />;
			case 'shape': return <Pentagon size={16} />;
			case 'image': return <Image size={16} />;
			default: return <HelpCircle size={16} />;
		}
	};

	const colorForType = () => {
		return 'var(--accent)';
	};

	return (
		<div className="sprite-panel" style={{ flex: 1, display: 'flex', flexDirection: 'column', minHeight: 0 }}>
			<div className="panel-body" style={{ background: 'transparent' }}>
				<div className="sprite-list">
					{state.sprites.map(sprite => (
						<div
							key={sprite.id}
							className={`sprite-card ${state.selectedSpriteId === sprite.id ? 'selected' : ''}`}
							onClick={() => dispatch({ type: 'SELECT_SPRITE', id: sprite.id })}
						>
							<div className="sprite-card-icon" style={{ color: colorForType() }}>
								{iconForType(sprite.type)}
							</div>
							<div className="sprite-card-info">
								<div className="sprite-card-name">{sprite.name}</div>
								<div className="sprite-card-type">{sprite.type}</div>
							</div>
							<div className="sprite-card-actions">
								<button
									className="sprite-action-btn"
									onClick={(e) => { e.stopPropagation(); dispatch({ type: 'DUPLICATE_SPRITE', id: sprite.id }); }}
									title="Duplicate"
								>
									<Copy size={14} />
								</button>
								<button
									className="sprite-action-btn danger"
									onClick={(e) => { e.stopPropagation(); dispatch({ type: 'REMOVE_SPRITE', id: sprite.id }); }}
									title="Delete"
								>
									<X size={14} />
								</button>
							</div>
						</div>
					))}
				</div>
			</div>
			<div className="add-sprite-area" style={{ position: 'relative' }}>
				{showMenu && (
					<div className="add-sprite-menu">
						<button className="add-sprite-option" onClick={() => handleAdd('text')}>
							<span style={{ color: 'var(--accent)', display: 'flex' }}><Type size={14} /></span> Text
						</button>
						<button className="add-sprite-option" onClick={() => handleAdd('shape')}>
							<span style={{ color: 'var(--accent)', display: 'flex' }}><Pentagon size={14} /></span> Shape
						</button>

					</div>
				)}
				<button className="add-sprite-btn" onClick={() => setShowMenu(!showMenu)}>
					+ Add Source
				</button>
			</div>
		</div>
	);
}