import React, { ReactElement, ComponentType } from 'react';
import { FlatList, ActivityIndicator, View, FlatListProps, ListRenderItem } from 'react-native';

interface CustomFlatListProps<ItemT> extends Omit<FlatListProps<ItemT>, 'renderItem' | 'data'> {
  data: ItemT[];
  renderItem: ListRenderItem<ItemT>;
  ListHeaderComponent?: ReactElement | ComponentType<any> | null;
  ListFooterComponent?: ReactElement | ComponentType<any> | null;
  horizontal?: boolean;
  isLoading?: boolean;
  loadingComponent?: ReactElement | ComponentType<any> | null;
}

function CustomFlatList<ItemT>({ 
  data, 
  renderItem, 
  ListHeaderComponent, 
  ListFooterComponent, 
  horizontal = false, 
  isLoading = false, 
  loadingComponent = <ActivityIndicator size="large" />, 
  contentContainerStyle,
  ...props 
}: CustomFlatListProps<ItemT>) {

  return (
    <FlatList
      data={data}
      renderItem={renderItem}
      keyExtractor={(item, index) => index.toString()}
      ListHeaderComponent={ListHeaderComponent}
      ListFooterComponent={ListFooterComponent}
      horizontal={horizontal}
      contentContainerStyle={contentContainerStyle}
      {...props}
    />
  );
}

export default CustomFlatList;