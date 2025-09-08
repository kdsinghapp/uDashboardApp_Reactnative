import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  StatusBar,
  Image,
  TextInput,
  Modal,
  Alert,
  Dimensions
} from 'react-native';
import imageIndex from './assets/imageIndex';
// import { Ionicons } from '@expo/vector-icons';

const { width } = Dimensions.get('window');

const InvestmentApp = () => {
  const [activeTab, setActiveTab] = useState('home');
  const [investmentAmount, setInvestmentAmount] = useState('');
  const [showInvestmentModal, setShowInvestmentModal] = useState(false);
  const [showContactModal, setShowContactModal] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');

  const calculateReturns = (amount) => {
    const investment = parseFloat(amount) || 0;
    const monthlyReturn = investment * 0.7; // 70% of investment
    const yearlyReturn = monthlyReturn * 12;
    return {
      monthly: monthlyReturn.toLocaleString('en-IN', {
        style: 'currency',
        currency: 'INR',
        maximumFractionDigits: 0
      }),
      yearly: yearlyReturn.toLocaleString('en-IN', {
        style: 'currency',
        currency: 'INR',
        maximumFractionDigits: 0
      })
    };
  };

  const handleInvestNow = () => {
    if (!investmentAmount || parseFloat(investmentAmount) < 5000) {
      Alert.alert('Invalid Investment', 'Minimum investment is ₹5,000');
      return;
    }
    Alert.alert(
      'Investment Received',
      `Thank you for investing ${parseFloat(investmentAmount).toLocaleString('en-IN', {
        style: 'currency',
        currency: 'INR'
      })}. Our team will contact you shortly.`
    );
    setShowInvestmentModal(false);
    setInvestmentAmount('');
  };

  const handleContactSubmit = () => {
    if (!name || !email || !phone) {
      Alert.alert('Error', 'Please fill all fields');
      return;
    }
    Alert.alert('Success', 'Thank you for your interest. We will contact you soon.');
    setShowContactModal(false);
    setName('');
    setEmail('');
    setPhone('');
  };

  const InvestmentModal = () => (
    <Modal
      animationType="slide"
      transparent={true}
      visible={showInvestmentModal}
      onRequestClose={() => setShowInvestmentModal(false)}
    >
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <Text style={styles.modalTitle}>Invest in EBAL ITALIAN</Text>
          <Text style={styles.modalSubtitle}>
            Minimum Investment: ₹5,000 | Maximum: ₹100 Crore
          </Text>

          <TextInput
            style={styles.input}
            placeholder="Enter Investment Amount (₹)"
            keyboardType="numeric"
            value={investmentAmount}
            onChangeText={setInvestmentAmount}
          />

          {investmentAmount && parseFloat(investmentAmount) >= 5000 && (
            <View style={styles.returnsContainer}>
              <Text style={styles.returnsText}>
                Estimated Monthly Return: {calculateReturns(investmentAmount).monthly}
              </Text>
              <Text style={styles.returnsText}>
                Estimated Yearly Return: {calculateReturns(investmentAmount).yearly}
              </Text>
            </View>
          )}

          <View style={styles.modalButtons}>
            <TouchableOpacity
              style={[styles.modalButton, styles.cancelButton]}
              onPress={() => setShowInvestmentModal(false)}
            >
              <Text style={styles.buttonText}>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.modalButton, styles.investButton]}
              onPress={handleInvestNow}
            >
              <Text style={styles.buttonText}>Invest Now</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );

  const ContactModal = () => (
    <Modal
      animationType="slide"
      transparent={true}
      visible={showContactModal}
      onRequestClose={() => setShowContactModal(false)}
    >
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <Text style={styles.modalTitle}>Contact Us</Text>

          <TextInput
            style={styles.input}
            placeholder="Full Name"
            value={name}
            onChangeText={setName}
          />

          <TextInput
            style={styles.input}
            placeholder="Email Address"
            keyboardType="email-address"
            value={email}
            onChangeText={setEmail}
          />

          <TextInput
            style={styles.input}
            placeholder="Phone Number"
            keyboardType="phone-pad"
            value={phone}
            onChangeText={setPhone}
          />

          <View style={styles.modalButtons}>
            <TouchableOpacity
              style={[styles.modalButton, styles.cancelButton]}
              onPress={() => setShowContactModal(false)}
            >
              <Text style={styles.buttonText}>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.modalButton, styles.investButton]}
              onPress={handleContactSubmit}
            >
              <Text style={styles.buttonText}>Submit</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );

  const HomeScreen = () => (
    
    <ScrollView style={styles.screenContainer}>
      <View style={styles.heroSection}>
        <Text style={styles.heroTitle}>EBAL ITALIAN LUXURY FASHION</Text>
        <Text style={styles.heroSubtitle}>
          "Aapka Investment, Hamara Expertise, Milkar Banaye Ek Profit Machine!"
        </Text>
        <TouchableOpacity
          style={styles.ctaButton}
          onPress={() => setShowInvestmentModal(true)}
        >
          <Text style={styles.ctaButtonText}>Invest Now</Text>
        </TouchableOpacity>
      </View>
      
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Why Invest With Us?</Text>
        <View style={styles.benefitsContainer}>
          <View style={styles.benefitCard}>
            {/* <Ionicons name="trending-up" size={32} color="#2a62ff" /> */}
            <Text style={styles.benefitTitle}>High Returns</Text>
            <Text style={styles.benefitText}>
              70% Profit Share directly to investors
            </Text>
          </View>

          <View style={styles.benefitCard}>
            {/* <Ionicons name="shield-checkmark" size={32} color="#2a62ff" /> */}
            <Text style={styles.benefitTitle}>Low Risk</Text>
            <Text style={styles.benefitText}>
              Established textile business with consistent demand
            </Text>
          </View>

          <View style={styles.benefitCard}>
            {/* <Ionicons name="cash" size={32} color="#2a62ff" /> */}
            <Text style={styles.benefitTitle}>Passive Income</Text>
            <Text style={styles.benefitText}>
              Monthly returns without active involvement
            </Text>
          </View>

          <View style={styles.benefitCard}>
            {/* <Ionicons name="business" size={32} color="#2a62ff" /> */}
            <Text style={styles.benefitTitle}>Expert Management</Text>
            <Text style={styles.benefitText}>
              Textile industry experts handle operations
            </Text>
          </View>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>How It Works</Text>
        <View style={styles.stepsContainer}>
          <View style={styles.step}>
            <View style={styles.stepNumber}>
              <Text style={styles.stepNumberText}>1</Text>
            </View>
            <Text style={styles.stepText}>You Invest (₹5,000 to ₹100 Crore)</Text>
          </View>

          <View style={styles.step}>
            <View style={styles.stepNumber}>
              <Text style={styles.stepNumberText}>2</Text>
            </View>
            <Text style={styles.stepText}>We Manufacture Premium T-Shirts & Jeans</Text>
          </View>

          <View style={styles.step}>
            <View style={styles.stepNumber}>
              <Text style={styles.stepNumberText}>3</Text>
            </View>
            <Text style={styles.stepText}>We Sell Products in Global Market</Text>
          </View>

          <View style={styles.step}>
            <View style={styles.stepNumber}>
              <Text style={styles.stepNumberText}>4</Text>
            </View>
            <Text style={styles.stepText}>You Receive 70% of Net Profit Monthly</Text>
          </View>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Return Calculator</Text>
        <View style={styles.calculator}>
          <TextInput
            style={styles.calculatorInput}
            placeholder="Enter Investment Amount (₹)"
            keyboardType="numeric"
            value={investmentAmount}
            onChangeText={setInvestmentAmount}
          />
          {investmentAmount && parseFloat(investmentAmount) >= 5000 && (
            <View style={styles.calculatorResult}>
              <Text style={styles.calculatorText}>
                Monthly Return: {calculateReturns(investmentAmount).monthly}
              </Text>
              <Text style={styles.calculatorText}>
                Yearly Return: {calculateReturns(investmentAmount).yearly}
              </Text>
            </View>
          )}
          <TouchableOpacity
            style={styles.calculatorButton}
            onPress={() => setShowInvestmentModal(true)}
          >
            <Text style={styles.calculatorButtonText}>Invest Now</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Ready to Get Started?</Text>
        <Text style={styles.sectionText}>
          Join hundreds of investors who are already benefiting from our profitable
          textile business. With guaranteed returns and expert management, your
          investment is in safe hands.
        </Text>
        <TouchableOpacity
          style={styles.ctaButton}
          onPress={() => setShowInvestmentModal(true)}
        >
          <Text style={styles.ctaButtonText}>Start Investing Today</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
    
  );


  const AboutScreen = () => (
    <ScrollView style={styles.screenContainer}>
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>About EBAL ITALIAN</Text>
        <Text style={styles.sectionText}>
          EBAL ITALIAN LUXURY FASHION is a premium Italian textile manufacturing company
          specializing in high-quality T-Shirts and Jeans. With years of industry
          experience, we have established ourselves as a trusted name in the textile
          sector.
        </Text>
        <Text style={styles.sectionText}>
          Our mission is to revolutionize the textile industry by providing investors
          with a unique opportunity to participate in the profitable fashion
          manufacturing business while earning substantial returns.
        </Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Our Vision</Text>
        <Text style={styles.sectionText}>
          To become a leading global textile brand that empowers investors through
          transparent and profitable investment opportunities in the fashion industry.
        </Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Why Textile Industry?</Text>
        <Text style={styles.sectionText}>
          The textile industry has consistently shown growth and resilience, even during
          economic downturns. Clothing is a basic necessity, and the demand for quality
          fashion products continues to rise globally.
        </Text>
        <Text style={styles.sectionText}>
          By investing in EBAL ITALIAN, you're tapping into a stable market with
          continuous demand and high-profit margins.
        </Text>
      </View>
    </ScrollView>
  );

  const ContactScreen = () => (
    <ScrollView style={styles.screenContainer}>
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Get In Touch</Text>
        <Text style={styles.sectionText}>
          Have questions about our investment opportunities? Our team is here to help
          you make informed decisions about your investments.
        </Text>

        <View style={styles.contactInfo}>
          <View style={styles.contactItem}>
            {/* <Ionicons name="mail" size={24} color="#2a62ff" /> */}
            <Text style={styles.contactText}>info@ebalitalian.com</Text>
          </View>

          <View style={styles.contactItem}>
            {/* <Ionicons name="call" size={24} color="#2a62ff" /> */}
            <Text style={styles.contactText}>+91 9876543210</Text>
          </View>

          <View style={styles.contactItem}>
            {/* <Ionicons name="location" size={24} color="#2a62ff" /> */}
            <Text style={styles.contactText}>
              Milan | Mumbai | New York | Paris
            </Text>
          </View>
        </View>

        <TouchableOpacity
          style={styles.ctaButton}
          onPress={() => setShowContactModal(true)}
        >
          <Text style={styles.ctaButtonText}>Contact Us</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );

  const renderScreen = () => {
    switch (activeTab) {
      case 'home':
        return <HomeScreen />;
      case 'about':
        return <AboutScreen />;
      case 'contact':
        return <ContactScreen />;
      default:
        return <HomeScreen />;
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#2a62ff" />
      
      <View style={styles.header}>
        <Text style={styles.headerTitle}>EBAL ITALIAN</Text>
        <Text style={styles.headerSubtitle}>LUXURY FASHION</Text>
      </View>

      {renderScreen()}

      <View style={styles.footer}>
        <TouchableOpacity
          style={[styles.footerButton, activeTab === 'home' && styles.activeFooterButton]}
          onPress={() => setActiveTab('home')}
        >
          <Image
            // name="home"
            // size={24}
            source={imageIndex.homeActive}
style={{height:25, width:25}}
            tintColor={activeTab === 'home' ? '#2a62ff' : '#666'}
          />
          <Text
            style={[
              styles.footerButtonText,
              activeTab === 'home' && styles.activeFooterButtonText
            ]}
          >
            Home
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.footerButton, activeTab === 'about' && styles.activeFooterButton]}
          onPress={() => setActiveTab('about')}
        >
            <Image
            // name="home"
            // size={24}
            source={imageIndex.Note}
style={{height:25, width:25}}
            tintColor={activeTab === 'home' ? '#2a62ff' : '#666'}
          />
          <Text
            style={[
              styles.footerButtonText,
              activeTab === 'about' && styles.activeFooterButtonText
            ]}
          >
            About
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.footerButton, activeTab === 'contact' && styles.activeFooterButton]}
          onPress={() => setActiveTab('contact')}
        >
          <Image
            // name="home"
            // size={24}
            source={imageIndex.email}
style={{height:25, width:25}}
            tintColor={activeTab === 'home' ? '#2a62ff' : '#666'}
          />
          <Text
            style={[
              styles.footerButtonText,
              activeTab === 'contact' && styles.activeFooterButtonText
            ]}
          >
            Contact
          </Text>
        </TouchableOpacity>
      </View>

      <InvestmentModal />
      <ContactModal />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    backgroundColor: '#2a62ff',
    padding: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerTitle: {
    color: '#fff',
    fontSize: 22,
    fontWeight: 'bold',
  },
  headerSubtitle: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '500',
  },
  screenContainer: {
    flex: 1,
    paddingBottom: 70,
  },
  heroSection: {
    backgroundColor: '#2a62ff',
    padding: 30,
    alignItems: 'center',
  },
  heroTitle: {
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
  },
  heroSubtitle: {
    color: '#fff',
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 20,
    fontStyle: 'italic',
  },
  ctaButton: {
    backgroundColor: '#fff',
    paddingHorizontal: 30,
    paddingVertical: 15,
    borderRadius: 30,
  },
  ctaButtonText: {
    color: '#2a62ff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  section: {
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 15,
    color: '#2a62ff',
    textAlign: 'center',
  },
  sectionText: {
    fontSize: 16,
    lineHeight: 24,
    marginBottom: 15,
    color: '#333',
    textAlign: 'center',
  },
  benefitsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  benefitCard: {
    width: width / 2 - 30,
    backgroundColor: '#f8f8f8',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 15,
  },
  benefitTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 10,
    marginBottom: 5,
    textAlign: 'center',
  },
  benefitText: {
    fontSize: 14,
    textAlign: 'center',
    color: '#666',
  },
  stepsContainer: {
    marginVertical: 10,
  },
  step: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  stepNumber: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#2a62ff',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  stepNumberText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 18,
  },
  stepText: {
    fontSize: 16,
    flex: 1,
    color: '#333',
  },
  calculator: {
    backgroundColor: '#f8f8f8',
    padding: 20,
    borderRadius: 10,
  },
  calculatorInput: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 5,
    padding: 15,
    fontSize: 16,
    marginBottom: 15,
  },
  calculatorResult: {
    marginBottom: 15,
  },
  calculatorText: {
    fontSize: 16,
    marginBottom: 5,
    fontWeight: '500',
  },
  calculatorButton: {
    backgroundColor: '#2a62ff',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
  },
  calculatorButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  contactInfo: {
    marginVertical: 20,
  },
  contactItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  contactText: {
    fontSize: 16,
    marginLeft: 10,
    color: '#333',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: '#f8f8f8',
    paddingVertical: 10,
    borderTopWidth: 1,
    borderTopColor: '#e0e0e0',
    position: 'absolute',
    bottom: 0,
    width: '100%',
  },
  footerButton: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 5,
  },
  activeFooterButton: {
    color: '#2a62ff',
  },
  footerButtonText: {
    fontSize: 12,
    marginTop: 5,
    color: '#666',
  },
  activeFooterButtonText: {
    color: '#2a62ff',
    fontWeight: 'bold',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    padding: 20,
  },
  modalContent: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
    width: '100%',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
    color: '#2a62ff',
  },
  modalSubtitle: {
    fontSize: 14,
    marginBottom: 20,
    textAlign: 'center',
    color: '#666',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 5,
    padding: 15,
    fontSize: 16,
    marginBottom: 15,
  },
  returnsContainer: {
    backgroundColor: '#f0f7ff',
    padding: 15,
    borderRadius: 5,
    marginBottom: 15,
  },
  returnsText: {
    fontSize: 16,
    marginBottom: 5,
    fontWeight: '500',
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  modalButton: {
    padding: 15,
    borderRadius: 5,
    width: '48%',
    alignItems: 'center',
  },
  cancelButton: {
    backgroundColor: '#e0e0e0',
  },
  investButton: {
    backgroundColor: '#2a62ff',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default InvestmentApp;