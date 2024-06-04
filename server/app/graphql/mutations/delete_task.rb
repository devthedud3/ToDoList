# frozen_string_literal: true

module Mutations
  class DeleteTask < BaseMutation
    field :task, Types::TaskType, null: false
    field :message, [String], null: false

    argument :id, String, required: true

    def resolve(id:)
      task = Task.find(id)
      if task.destroy
        {
          task: task,
          message: ["Successully deleted task"] 
        }
      else 
        {
          task: nil,
          message: [task.errors.full_message]
        }
      end
    end
  end
end
