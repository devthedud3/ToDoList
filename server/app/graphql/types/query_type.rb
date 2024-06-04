# frozen_string_literal: true

module Types
  class QueryType < Types::BaseObject
    field :lists, [Types::ListType], null: false
    field :tasks, [Types::TaskType], null: false
    
    def lists
      List.all
    end

    def list(id:)
      List.find(id:)
    end

    def tasks
      Task.all
    end
    
    field :task, Types::TaskType, null: false do
      argument :id, ID, required: true
    end
    def task(id:)
      Task.find(id)
    end
  end
end
