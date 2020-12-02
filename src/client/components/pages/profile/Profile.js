import React from 'react'
 
export default function Profile() {
	return(
		<div style={styles.mainContainer}>
			<h1 style={{color: 'green', margin: '0 0 0 0', padding: '0 0 0 0'}}>Profile</h1>
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