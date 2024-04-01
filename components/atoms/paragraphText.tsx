import React from 'react';
import { ScrollView, View, Text, StyleSheet, TextStyle } from 'react-native';
import { ColorScheme } from '@constants/colorScheme';

const styles = StyleSheet.create({
  header: {
    fontFamily: 'HelveticaNeue-Light',
    fontWeight: 'bold', // Default weight
  },
  content: {
    fontSize: 16,
    fontFamily: 'HelveticaNeue-Light',
    fontWeight: '300',
    paddingTop: 5,
    textAlign: 'justify',
  },
  paragraph: {
    marginBottom: 20, // Adjust based on your design needs
  },
  contentContainer: {
    maxHeight: 160, // Maximum height for the content area to start scrolling
  },
});

interface ParagraphTextProps {
  header: string;
  content: string;
  headerFontColor?: string;
  headerFontSize?: number;
  paddingLeft?: number;
  headerFontWeight?: TextStyle['fontWeight'];
}

const ParagraphText: React.FC<ParagraphTextProps> = ({
  header,
  content,
  headerFontColor = ColorScheme.Black,
  headerFontSize = 24,
  headerFontWeight = 'bold',
  paddingLeft,
}) => {
  const formatContent = (content: string): string[] => content.split(/\n\n+/);
  const contentParagraphs = formatContent(content);

  return (
    <View style={{ paddingLeft: paddingLeft }}>
      <Text style={[styles.header, { fontSize: headerFontSize, color: headerFontColor, fontWeight: headerFontWeight }]}>{header}</Text>
      <ScrollView style={styles.contentContainer} showsVerticalScrollIndicator={false}>
        {contentParagraphs.map((paragraph, index) => (
          <Text key={`paragraph-${index}`} style={styles.content}>
            {paragraph}
          </Text>
        ))}
      </ScrollView>
    </View>
  );
};

export default ParagraphText;
