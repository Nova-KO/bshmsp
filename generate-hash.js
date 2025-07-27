// Generate Password Hash Script
// This script generates hashed passwords for admin authentication

const bcrypt = require('bcryptjs');

async function generateHash() {
    console.log('🔐 Generating password hashes for admin authentication...\n');
    
    // Default credentials (you can change these)
    const password = 'bsh2024';
    const securityAnswer = 'blue';
    
    try {
        // Generate password hash
        const passwordHash = await bcrypt.hash(password, 10);
        
        // Generate security answer hash
        const answerHash = await bcrypt.hash(securityAnswer, 10);
        
        console.log('✅ Generated hashes successfully!\n');
        console.log('📋 Copy these hashes to api/admin-auth.js:\n');
        console.log('Password Hash:');
        console.log(passwordHash);
        console.log('\nSecurity Answer Hash:');
        console.log(answerHash);
        console.log('\n🔧 Next steps:');
        console.log('1. Open api/admin-auth.js');
        console.log('2. Replace the placeholder hashes with the ones above');
        console.log('3. Save the file');
        console.log('4. Test the authentication system');
        
    } catch (error) {
        console.error('❌ Error generating hashes:', error);
    }
}

// Run the hash generation
generateHash(); 