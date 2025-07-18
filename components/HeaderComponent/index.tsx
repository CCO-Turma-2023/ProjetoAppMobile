import { View, Text, Pressable, Modal } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useContextHome } from "@/contexts/ContextHome";
import { useState } from "react";


export default function Header() {
  const {showTab, setShowTab, notifications, setNotifications} = useContextHome()

  return (
    <View className="flex-row bg-[#1A1A1A] items-center justify-between p-2 pb-3 px-4 border border-b-white">
      <View style={{ width: 40 }} />

      {showTab && <Modal
        transparent
        animationType="slide"
        visible={showTab}
        onRequestClose={() => setShowTab(false)}
      >
        <View className="w-full h-full flex flex-row">
          {/* Parte invisível da esquerda para clique fora do painel */}
          <Pressable className="h-full w-1/2" onPress={() => setShowTab(false)} />

          {/* Painel direito com conteúdo */}
          <View className="h-full w-1/2 border-l border-white bg-[#1A1A1A] p-4">
            {/* Botão de fechar o modal */}
            <View className="items-end mb-4">
              <Pressable
                className="p-1 rounded-full bg-gray-800"
                onPress={() => setShowTab(false)}
              >
                <Ionicons name="close" color="white" size={22} />
              </Pressable>
            </View>

            {/* Título do painel */}
            <Text className="text-white text-lg font-bold mb-3">Notificações</Text>

            {/* Lista de notificações */}
            <View className="gap-3">
              {notifications?.length > 0 ? (
                notifications.map((n, index) => (
                  <View
                    key={index}
                    className="bg-[#2A2A2A] rounded-xl p-5 border border-gray-700 relative"
                  >
                    {/* Botão de excluir a notificação */}
                    <Pressable
                      className="absolute top-2 right-2 p-1 rounded-full bg-red-600"
                      onPress={() => {
                        const updated = [...notifications];
                        updated.splice(index, 1);
                        setNotifications(updated);
                      }}
                    >
                      <Ionicons name="close" size={16} color="white" />
                    </Pressable>

                    <Text className="text-white font-semibold text-base">
                      {n.title}
                    </Text>
                    <Text className="text-gray-300 text-sm mt-1">{n.message}</Text>
                    <Text className="text-gray-400 text-xs mt-2 text-right">
                      {new Date(n.date).toLocaleTimeString("pt-BR", {
                        hour: "2-digit",
                        minute: "2-digit",
                        hour12: false,
                      })}
                    </Text>
                  </View>
                ))
              ) : (
                <Text className="text-gray-400">Nenhuma notificação recebida.</Text>
              )}
            </View>
          </View>
        </View>
      </Modal>
      }

      <View className="flex-1 items-center">
        <Text className="text-white font-bold text-xl">FIND TO WATCH</Text>
      </View>

      <Pressable
        className="rounded-full bg-[#262626] border border-[rgba(255,255,255,0.8)] mr-2 relative"
        onPress={() => setShowTab((prev) => !prev)}
      >
        {/* Ícone de notificações */}
        <Ionicons className="p-2" name="notifications" size={24} color="white" />

        {/* Bolinha de alerta se houver notificações */}
        {notifications?.length > 0 && (
          <View className="absolute top-0 right-0 w-3 h-3 bg-red-500 rounded-full border border-white" />
        )}
      </Pressable>
    </View>
  );
}
