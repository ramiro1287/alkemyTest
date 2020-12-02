import React from 'react'
 
export default function NotFound() {
	return(
		<div style={styles.mainContainer}>
			<h1 style={{color: 'red', margin: '0 0 0 0', padding: '0 0 0 0'}}>Page not found</h1>
		</div>
	)
}

// ---------------------------------------------------------------------- styles

const styles = {
	mainContainer: {
		display: 'flex',
		width: '100%',
		justifyContent: 'center',
		alignItems: 'center'
	}
}